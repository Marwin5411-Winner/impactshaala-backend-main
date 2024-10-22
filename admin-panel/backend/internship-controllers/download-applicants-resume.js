import Applicants from "../../../models/applicants/applicants.js";
import fs from "fs";
import request from "request-promise-native";

import path from "path"; // Import the path module

// Get the directory where this module resides
const currentFilePath = new URL(import.meta.url).pathname;
const currentDir = path.dirname(currentFilePath);

// Define the directory where PDF files will be saved
const downloadDir = path.join(currentDir, "./downloads");


async function downloadPDF(pdfURL, outputFilename) {
    try {
        const pdfBuffer = await request.get({ uri: pdfURL, encoding: null });
        console.log("Writing downloaded PDF file to " + outputFilename + "...");
        fs.writeFileSync(outputFilename, pdfBuffer);
        return true;
    } catch (error) {
        console.error("Error downloading PDF:", error);
        return false;
    }
}



async function downloadApplicantsPdf(req, res, next) {
    try {
        const { uid } = req.query;
        const getApplication = await Applicants.findOne({ userId: uid });
        console.log(`getApplication ${getApplication}`);
        if (!getApplication) {
            return res.status(404).json({ success: false, message: "Couldn't find the application you are looking for." });
        }
        const pdfFileName = `${getApplication.userId}.pdf`;
        const pdfFilePath = path.join(downloadDir, pdfFileName);
        const success = await downloadPDF(getApplication.attachment, pdfFilePath);
        if (success) {
            // Send the downloaded PDF file to the frontend
            return res.sendFile(pdfFileName, { root: downloadDir });
        } else {
            return res.status(500).json({ success: false, message: "Failed to download PDF. Please check server logs for details." });
        }
    } catch (error) {
        console.error("Error in downloadApplicantsPdf:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}


export default downloadApplicantsPdf;