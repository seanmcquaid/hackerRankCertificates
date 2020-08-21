function joinedLogger(level, sep) {
    return (...args) => {
        console.log(level, sep)
        console.log(args);
        let loggerString = '';
        const filteredArgs = args.filter(message => message.level >= level);
        filteredArgs.forEach(message => {
          loggerString += filteredArgs.indexOf(message) !== filteredArgs.length - 1 ? message.text + sep : message.text;
        });
        logger({text : loggerString});
    }
  }