
exports.printLine = function (argv) {
    return function(line){
        if(argv.pigments) return process.stdout.write(line + '\n');
        return process.stdout.write(line.stripColors + '\n');
    }
};