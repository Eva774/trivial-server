class Log {
    public warn(message: any) {
        console.warn(this.getTimestampMessage(message));
    }

    public error(message: any) {
        console.error(this.getTimestampMessage(message));
    }

    public info(message: any) {
        console.info(this.getTimestampMessage(message));
    }

    public log(message: any) {
        console.log(this.getTimestampMessage(message));
    }

    public debug(message: any) {
        console.debug(this.getTimestampMessage(message));
    }
    private getTimestampMessage(message: any) {
        return new Date().toISOString() + ' - ' + message;
    }
}

export const log = new Log();
