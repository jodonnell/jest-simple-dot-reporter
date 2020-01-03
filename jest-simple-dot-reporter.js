const pluralize = (word, count) => `${count} ${word}${count === 1 ? '' : 's'}`;

class JestSimpleDotReporter {
    constructor(globalConfig, options) {
        this._globalConfig = globalConfig;
        this._options = options;
    }

    onRunStart(test) {
        this._numTestSuitesLeft = test.numTotalTestSuites; 

        console.log()
        console.log(`Found ${test.numTotalTestSuites} test suites`);
    }

    onRunComplete(test, results) {
        const {
            numFailedTests,
            numPassedTests,
            numPendingTests,
            testResults,
            numTotalTests,
            startTime
        } = results;

        console.log();
        testResults.map(({failureMessage}) => {
            if (failureMessage) {
                console.error(failureMessage);
            }
        });

        if (!results.snapshot.didUpdate && results.snapshot.unchecked) {
            const obsoleteError = pluralize('obsolete snapshot', results.snapshot.unchecked) + ' found.';
            if (this._options.color)
                console.error(`\x1b[31m${obsoleteError}\x1b[0m`);
            else
                console.error(obsoleteError);
        }

        console.log(`Ran ${numTotalTests} tests in ${testDuration()}`);
        process.stdout.write(` ${numPassedTests || 0} passing`);
        process.stdout.write(` ${numFailedTests || 0} failing`);
        process.stdout.write(` ${numPendingTests || 0} pending`);
        console.log();

        function testDuration() {
            const end = new Date();
            const start = new Date(startTime);

            const seconds = (end - start) / 1000;
            return `${seconds} s`;
        }
    }

    onTestResult(test, testResult) {
        for (var i = 0; i < testResult.testResults.length; i++) {
            if (testResult.testResults[i].status === 'passed') {
                process.stdout.write('.');
            } else if (testResult.testResults[i].status === 'pending') {
                process.stdout.write('*');
            } else {
                process.stdout.write('F');
            }
        }

        if (!--this._numTestSuitesLeft && this._globalConfig.collectCoverage) {
            console.log()
        }
    }
}

module.exports = JestSimpleDotReporter;
