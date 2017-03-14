import buildPackage from './build-package';
import path from 'path';

// Run buildPackage on all of our packages
buildPackage(`alto-react-ciscospark`, path.resolve(__dirname, `..`))
  .catch((error) => {
    throw new Error(error);
  });
