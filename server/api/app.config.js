// Databases - labels
// App Database configuration - Labels
// App Primary_DB Labels

// If Docker Deoloyment - SET (PROD) - db_config.database_host_dev_prod.prod
// If Local Development - SET (DEV) - db_config.database_host_dev_prod.dev
// Dev environment for docker_compose and npm
const database_host_dev_prod = {
    dev: "0.0.0.0",
    prod: "postgres_db"
}
// DB_HOST Configuration
const db_Host = database_host_dev_prod.dev;

// Database labels
const database_labels = {
    db_name: "yorkproject"
}
// database connection strings
const database_connection = {
    user: "danzilla",
    pwd: "123qwe",
    port: "5432",
    defaultDB: "public",
    yorkprojectDB: database_labels.db_name
}
// Pg connection for | BlingBlaw and public database
// Databases settings and configurations
const database = {
    // App - Assets
    yorkprojectConnection: {
        user: database_connection.user,
        password: database_connection.pwd,
        database: database_connection.yorkprojectDB,
        port: database_connection.port,
        host: db_Host,
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000
    }
}

// PostGres connection
const { Pool } = require('pg');
// App - blingBlaw
// init - DB connection
const yorkprojectConnection = new Pool(database.yorkprojectConnection)
yorkprojectConnection.on('error', (err, client) => {
    console.error("Unexpected error on idle client", err)
    process.exit(-1)
});

// Export
const app_config = {
    database_labels: database_labels,
    database_connection: database_connection,
    yorkprojectConnection: yorkprojectConnection
}
// Export Database config settings
module.exports = app_config;