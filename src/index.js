const fs = require('fs');
const path = require('path');
const WebScraper = require('./web-scraper');
const DownloadMaster = require('./download-master');
const Scheduler = require('./scheduler');

/**
 * Load configuration from a JSON file
 * @param {string} configPath - Path to the configuration file
 * @returns {Object} - Configuration object
 */
function loadConfig(configPath) {
  try {
    const configData = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configData);
  } catch (error) {
    console.error(`Error loading configuration from ${configPath}:`, error.message);
    process.exit(1);
  }
}

/**
 * Main function to start the application
 */
async function main() {
  console.log('Starting WebFile Scrape to ASUS Downloader...');
  
  // Determine the config path
  const configPath = process.argv[2] || path.join(__dirname, '..', 'config.json');
  console.log(`Loading configuration from: ${configPath}`);
  
  // Load configuration
  const config = loadConfig(configPath);
  
  // Create instances of the scraper and downloader
  const scraper = new WebScraper(config);
  const downloader = new DownloadMaster(config.asusDownloadMaster);
  
  // Test the connection to ASUS Download Master
  console.log('Testing connection to ASUS Download Master...');
  const loginSuccess = await downloader.login();
  if (!loginSuccess) {
    console.error('Failed to connect to ASUS Download Master. Please check your configuration.');
    process.exit(1);
  }
  
  // Create and start the scheduler
  const scheduler = new Scheduler(config, scraper, downloader);
  scheduler.start();
  
  console.log('Application started successfully.');
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('Received SIGINT in main process. Shutting down...');
  // Force exit after a short delay
  setTimeout(() => {
    console.log('Forcing process exit from main...');
    process.exit(0);
  }, 1000);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM in main process. Shutting down...');
  // Force exit after a short delay
  setTimeout(() => {
    console.log('Forcing process exit from main...');
    process.exit(0);
  }, 1000);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  // Force exit after a short delay
  setTimeout(() => {
    console.log('Forcing process exit due to uncaught exception...');
    process.exit(1);
  }, 1000);
});

// Start the application
main().catch(error => {
  console.error('Unhandled error:', error);
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});
