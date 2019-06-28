import * as monaco from 'monaco-editor';

console.log('anything?');

var editor = monaco.editor.create( document.getElementById( 'container' ), {
  value: [
    'function x() {',
    '\tconsole.log("Hello world!");',
    '}'
  ].join( '\n' ),
  language: 'javascript'
} );

//monaco.languages.register( {
//  id: 'json',
//  extensions: ['.json', '.bowerrc', '.jshintrc', '.jscsrc', '.eslintrc', '.babelrc'],
//  aliases: ['JSON', 'json'],
//  mimetypes: ['application/json'],
//} );

//function createLanguageClient( connection ) {
//  return new BaseLanguageClient( {
//    name: "Sample Language Client",
//    clientOptions: {
//      // use a language id as a document selector        
//      documentSelector: ['json'],
//      // disable the default error handler            
//      errorHandler: {
//        error: () => ErrorAction.Continue,
//        closed: () => CloseAction.DoNotRestart
//      }
//    },
//    services,
//    // create a language client connection from the JSON RPC connection on demand
//    connectionProvider: {
//      get: ( errorHandler, closeHandler ) => {
//        return Promise.resolve( createConnection( connection, errorHandler, closeHandler ) )
//      }
//    }
//  } )
//}

//// create the web socket
//const url = createUrl( '/sampleServer' )
//const webSocket = createWebSocket( url );
//// listen when the web socket is opened
//listen( {
//  webSocket,
//  onConnection: connection => {
//    // create and start the language client
//    const languageClient = createLanguageClient( connection );
//    const disposable = languageClient.start();
//    connection.onClose( () => disposable.dispose() );
//  }
//} );