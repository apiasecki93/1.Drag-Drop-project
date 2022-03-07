 const path = require('path'); // this is a node module that helps us find the path to our files
 
 
 //this is how you export things in the node js environment, and here we are exporting javascript object
module.exports = { 
    mode: 'development', // this is a property of webpack, and it is used to tell webpack what mode we are in to, and giving more meaningful  errors 
    //we have to set first our entry point of uor application, and here we are setting it to the app.js file
    //at the root entry of you project
    entry: './src/app.ts',
    output: {
    //we have to set the path where we want to output our bundle file
        // a contenthash to the name of the file so it will look like that: 'bundle.[contenthash].js', so that it will be unique for each build (DYNAMIC BUILD)
        path: path.resolve(__dirname, 'public'),//scpecyfie the path where you want to output your bundle file, resolve stand for absolute path
        filename: 'bundle.js', // you can name how you want to name your bundle file, and also can add
        publicPath: '/public/'
    },
    devtool: 'inline-source-map', // this is a tool that will help us debug our application, and it will give us the source code of the file, source-map is a tool that will help us debug our application and should be un-commented in the tsconfig.json file
    //to tell webpack what to do with typescirpt files, we have to add a loader
    
    module: {  //how to work with the files
        rules: [
            {
                test: /\.ts$/, //we are looking for all the files that ends with .ts
                use: 'ts-loader', //we are telling webpack to use the ts-loader to work with the files
                exclude: /node_modules/ //we are telling webpack to exclude the node_modules folder
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'] //we are telling webpack to look for files with these extensions to work with 
    }
}; 