import MstUserTypeModel from '../../models/master/master-data.js';
import {stringify} from 'flatted'

async function listMstUserTypes(req, res) {
    try {
        const userTypes = await MstUserTypeModel.find(); // Assuming 'all' method fetches all data
        // Extract only necessary properties and convert to JSON
        // Send the JSON response
        res.json(userTypes);
    } catch (error) {
        console.error('Error listing user types:', error);
        res.status(500).send("Error listing user types");
    }
}

export default listMstUserTypes;