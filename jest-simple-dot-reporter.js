class JestSimpleDotReporter {
    constructor(globalConfig, options) {
        this._globalConfig = globalConfig;
        this._options = options;
    }

    onRunStart(test) {
        console.log();
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
                console.log(failureMessage);
            }
        });

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
    }
}

module.exports = JestSimpleDotReporter;
