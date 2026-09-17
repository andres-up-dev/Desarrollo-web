import os from "os";
import chalk from "chalk";
import fs from "fs-extra";

async function generateTelemetryReport() {
    console.log(chalk.dim("Initializing Node.js Telemetry Engine..."));
    try {
        // ==========================================
        // 1. HARVEST SYSTEM TELEMETRY (Built-in 'os' module)
        // ==========================================
        // Get platform, total memory, used memory, CPU model and uptime
        const platform = os.platform();
        const cpuModel = os.cpus()[0].model;
        const totalMemMB = Math.round(os.totalmem() / (1024 * 1024));
        const freeMemMB = Math.round(os.freemem() / (1024 * 1024));
        const usedMemMB = totalMemMB - freeMemMB;
        const uptimeHours = (os.uptime() / 3600).toFixed(1);

        // ==========================================
        // 2. RENDER FORMATTED TERMINAL LOGS (Third-Party 'chalk')
        // ==========================================
        // Print colorful status report - same style as mb / free mem
        console.log(chalk.bold("=========================================="));
        console.log(chalk.bold("         SYSTEM & ENV TELEMETRY           "));
        console.log(chalk.bold("=========================================="));
        console.log(`${chalk.bold("OS Platform:")}    ${chalk.yellow(platform)}`);
        console.log(`${chalk.bold("Total Memory:")}   ${chalk.green(`${totalMemMB} MB`)}`);
        console.log(`${chalk.bold("Used Memory:")}    ${chalk.red(`${usedMemMB} MB`)}`);
        console.log(`${chalk.bold("Free Memory:")}    ${chalk.cyan(`${freeMemMB} MB`)}`);
        console.log(`${chalk.bold("CPU Model:")}      ${chalk.magenta(cpuModel)}`);
        console.log(`${chalk.bold("System Uptime:")}  ${chalk.blue(`${uptimeHours} hours`)}`);

        // ==========================================
        // 3. WRITE PERMANENT LOG FILE (fs-extra to .txt)
        // ==========================================
        // Append log entry to telemetry.txt using fs-extra
        const logEntry = `[${new Date().toISOString()}] PLATFORM: ${platform} | TOTAL: ${totalMemMB}MB | USED: ${usedMemMB}MB | FREE: ${freeMemMB}MB | CPU: ${cpuModel} | UPTIME: ${uptimeHours}h\n`;
        await fs.appendFile("telemetry.txt", logEntry);
        console.log(chalk.dim("Written to telemetry.txt"));
        
    } catch (error) {
        console.error(chalk.red("Telemetry report generation failed:"), error.message);
    }
}

// Execute engine
generateTelemetryReport();
