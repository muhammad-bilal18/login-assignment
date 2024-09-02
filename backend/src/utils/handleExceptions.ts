export function handleExceptions() {

    process.on('uncaughtException', (ex) => {
        console.log(ex.message);
        process.exit(1);
    });

    process.on('unhandledRejection', (ex) => {
        console.log(ex);
        process.exit(1);
    });
}