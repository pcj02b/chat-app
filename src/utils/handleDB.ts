import sql, { type IRecordSet, type IResult } from 'mssql'
import type { Message } from '../../shared/message.ts';

const sqlConfig = {
  // user: 'sa',
  // password: 'kj^7nRF3$oeQ',
  user: 'chat_user',
  password: 'pk3l8%gIL6Gj',
  database: 'chat_database',
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

const tableName = 'Messages'

const ConnectToDB = (async () => {
  try {
    await sql.connect(sqlConfig);
    return sql;
  } catch (err) {
    console.log('unknown sql error', err)
    return null;
  }
});

const GetMessages = (callback: (result: Message[]) => void) => {
  const getMessagesQuery = `select Username, Room, Text from dbo.${tableName};`;
  sql.query<Message>(getMessagesQuery).then((result) => {
    console.log('get messages recordset', result.recordset)
    callback(result.recordset);
  });
};

const AddMessageToDB = (async (message: Message) => {
  console.log('inserting message', message);
  const insertMessageQuery = `insert into dbo.${tableName} (Username, Room, Text)
  values (Null, Null, '${message.Text}');`;
  console.log('insertMessageQuery', insertMessageQuery)
  var result = await sql.query(insertMessageQuery);
  console.log('result', result);
});

const HandleDB = {
  ConnectToDB,
  GetMessages,
  AddMessageToDB,
};


export default HandleDB;