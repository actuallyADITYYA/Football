const express = require('express');
const footballSchema = require('./footballSchema');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(express.json()); // Middleware to parse JSON

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Football API!');
});

// Enable CORS
app.use(cors());

// Alternatively, specify allowed origins
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests from React app
  })
);

app.get('/api/football', async (req, res) => {
    try {
        const records = await footballSchema.find();
        res.status(200).send(records);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Add a New Record
app.post('/api/football/add', async (req, res) => {
    try {
        const { team,
            gamesPlayed,
            win,
            draw,
            loss,
            goalsFor,
            goalsAgainst,
            points,
            year} = req.body;

        if (!team || !year || (gamesPlayed == null || gamesPlayed == undefined)|| (win == null || win == undefined) || (draw == null || draw == undefined) || (loss == null || loss == undefined) || (goalsFor == null || goalsFor == undefined) || (goalsAgainst == null || goalsAgainst == undefined) || (points == null || points == undefined)) {
            console.log(req.body);
            console.log(team, gamesPlayed, win, draw, loss, goalsFor, goalsAgainst, points, year);
            return res.status(400).send({ message: 'All fields are required!' });
        }
        const match = await footballSchema.create({team, gamesPlayed, win, draw, loss, goalsFor, goalsAgainst, points,year });
        res.status(201).send({
            message: 'Record added successfully',
            match
        });
    } catch (error) {
        console.log(error.message);
        console.log(JSON.stringify(req.body));
        res.status(500).send({ message: error.message });
    }
});

// Update an Existing Record
app.put('/api/football/update/:team', async (req, res) => {
    try {
        const { team } = req.params; // Team name from the URL
        const { gamesPlayed, win, draw, loss, goalsFor, goalsAgainst, points, year } = req.body;

        // Validate input
        if (!gamesPlayed || !win || !draw || !loss || !goalsFor || !goalsAgainst || !points || !year) {
            return res.status(400).send({ message: 'All fields are required!' });
        }

        // Find and update the record
        const updatedRecord = await footballSchema.findOneAndUpdate(
            { team }, // Match the team name
            { gamesPlayed, win, draw, loss, goalsFor, goalsAgainst, points, year }, // New data
            { new: true, upsert: false } // Return updated record, do not create a new one if it doesn't exist
        ).catch((error) => {
            console.error('Update failed:', error);
        });



        if (!updatedRecord) {
            return res.status(404).send({ message: `Team '${team}' not found.` });
        }

        res.status(200).send({
            message: 'Record updated successfully',
            updatedRecord
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

app.delete('/api/football/delete/:team', async (req, res) => {
    try {
      const { team } = req.params;
  
      const deletedRecord = await footballSchema.findOneAndDelete({ team });
      if (!deletedRecord) {
        return res.status(404).send({ message: `Team '${team}' not found.` });
      }
  
      res.status(200).send({
        message: 'Record deleted successfully',
        deletedRecord,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
});

app.get('/api/football/summary/:year', async (req, res) => {
    try {
        const { year } = req.params;

        const summary = await footballSchema.aggregate([
            { $match: { year: parseInt(year) } }, // Filter by the given year
            {
                $group: {
                    _id: null,
                    totalGamesPlayed: { $sum: "$gamesPlayed" },
                    totalDraws: { $sum: "$draw" },
                    totalWins: { $sum: "$win" }
                }
            }
        ]);

        if (summary.length === 0) {
            return res.status(404).send({ message: `No records found for the year ${year}` });
        }

        res.status(200).send(summary[0]);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


app.get('/api/football/wins/:minWins', async (req, res) => {
    try {
        const { minWins } = req.params;

        const records = await footballSchema
            .find({ win: { $gt: parseInt(minWins) } })
            .limit(10);

        res.status(200).send(records);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

app.get('/api/football/average-goals', async (req, res) => {
    try {
        const { year, avgGoals } = req.query; // Extract year and avgGoals from query parameters

        if (!year || !avgGoals) {
            return res.status(400).send({ message: 'Year and average goals are required!' });
        }

        const teams = await footballSchema.aggregate([
            { $match: { year: parseInt(year) } }, // Match the given year
            {
                $addFields: {
                    avgGoals: { $divide: ["$goalsFor", "$gamesPlayed"] }, // Calculate average goals
                },
            },
            { $match: { avgGoals: { $gte: parseFloat(avgGoals) } } }, // Filter teams by average goals
        ]);

        if (teams.length === 0) {
            return res.status(404).send({ message: `No teams found for the year ${year} with average goals >= ${avgGoals}` });
        }

        res.status(200).send(teams);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })

mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.3', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Database connection failed:', error);
});