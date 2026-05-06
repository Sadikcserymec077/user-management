require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB...');

        const users = [];
        for (let i = 1; i <= 16; i++) {
            users.push({
                firstName: `TestFirst${i}`,
                lastName: `TestLast${i}`,
                email: `testuser${i}@example.com`,
                mobile: `90000000${i.toString().padStart(2, '0')}`,
                gender: i % 2 === 0 ? 'Female' : 'Male',
                status: i % 3 === 0 ? 'Inactive' : 'Active',
                location: `City ${i}, Country`,
            });
        }

        await User.insertMany(users);
        console.log('16 Dummy users inserted successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedUsers();
