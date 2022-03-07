const path = require('path'); // this is a node module that helps us find the path to our files
const CleanPlugin = require('clean-webpack-plugin'); // this is a node module that helps us clean the dist folder
 
 
//this is how you export things in the node js environment, and here we are exporting javascript object
module.exports = { 
   mode: 'production', // this will optimize code as it should 
   entry: './src/app.ts',
   output: {
       filename: 'bundle.js', 
       path: path.resolve(__dirname, 'dist'),
    },
   devtool: 'none', 
   module: {  
       rules: [
           {
               test: /\.ts$/, 
               use: 'ts-loader', 
               exclude: /node_modules/ 
           }
       ]
   },
   resolve: {
       extensions: ['.ts', '.js'] 
   },
   plugins: [ //extra extenions for webpack 
         new CleanPlugin.CleanWebpackPlugin() // before webpack wrtie anything to the dist folder provided in the path, it will clean it
   ]
}; 