function joinedLogger(level, sep) {
    return (...args) => {
        let loggerString = '';
        const filteredArgs = args.filter(message => message.level >= level);
        filteredArgs.forEach(message => {
          loggerString += filteredArgs.indexOf(message) !== filteredArgs.length - 1 ? message.text + sep : message.text;
        });
        console.log({text : loggerString});
    }
  }