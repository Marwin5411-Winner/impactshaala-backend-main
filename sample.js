import fs from 'fs';
import path from 'path';
import neo4j from 'neo4j-driver';

// Neo4j connection details
const uri = 'bolt://neo4j.staging-projects.iotreeminds.com:7687';
const user = 'neo4j';
const password = 'HF3Q9Zu1K7';

// CSV file paths
const csvFilePath = path.join('data.csv');

// Create a Neo4j driver instance
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();

async function importData() {
    try {
        // Read CSV file
        const data = fs.readFileSync(csvFilePath, 'utf-8');
        const lines = data.trim().split('\n');

        // Create node for each line in the CSV file
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].split(',');
            const name = line[0];
            const age = parseInt(line[1]);

            // Create node with Cypher query
            await session.run(
                'CREATE (:Person {name: $name, age: $age})',
                { name, age }
            );
        }

        console.log('Data imported successfully');
    } catch (error) {
        console.error('Error importing data:', error);
    } finally {
        // Close the session and driver
        await session.close();
        await driver.close();
    }
}

// Run the import function
importData();
