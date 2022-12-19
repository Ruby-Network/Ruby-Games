const process = require('process');
const { spawn } = require('child_process');
try {
    // Change the directory
    process.chdir('./cybertanks');
    console.log("directory has successfully been changed");
    // start server.js via node
    const child = spawn('node', ['server.js']);
    // Print output of server.js
    child.stdout.on('data', (data) => {
        console.log(`${data}`);
    }
    );
} catch (err) {// Printing error if occurs
    console.error(err)
    console.error("error while changing directory");
}
