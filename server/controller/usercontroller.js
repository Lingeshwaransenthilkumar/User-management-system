const mysql = require('mysql');


//create connection
const pool = mysql.createPool({
    connectionLimit:100,
    host : process.env.database_host,
    user : process.env.database_user,
    password : process.env.database_password,
    database:process.env.database,
})




// use connection
// view all the records
exports.view=(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log('connected to database');


        // select the rows
        connection.query('select * from users',(err,rows)=>{
            connection.release();

            if(!err){
                res.render('home',{ rows });
            }
            else{
                console.log(err);
            }
            console.log('the data from the users table is : \n ',rows);
        })
    }
)}

// search the records
exports.find=(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log('connected to database');

        let searchTerm = req.body.search;// here search is name of the attribute seach given in the input 


        // select the rows
        connection.query('select * from users where first_name like ? or last_name like ?',['%' + searchTerm + '%', '%' + searchTerm + '%'],(err,rows)=>{
            connection.release();

           
            if(!err){
                res.render('home',{ rows });
            }
            else{
                console.log(err);
            }
            console.log('the data from the users table is : \n ',rows);
        })
    }
)

}

//get the add_user link
exports.form=(req,res)=>{
    res.render('add_user');
}


//adding the user using insert query
exports.create=(req,res)=>{
    const {first_name,last_name,email,phone,comments,status} = req.body;
    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log(req.body);
        console.log('connected to database');

        //let searchTerm = req.body.search;// here search is name of the attribute seach given in the input 


        // select the rows
        //insert into users (NAME,AGE,CITY) values(?,?,?)
        connection.query('insert into users set first_name = ?, last_name = ?,email = ?,phone = ?,comments=?',[first_name,last_name,email,phone,comments],(err,rows)=>{
            connection.release();

           
            if(!err){
                console.log('inserted successfully');
                res.render('add_user',{alert : 'User added successfully.'});
            }
            else{
                console.log(err);
            }
            //console.log('the data from the users table is : \n ',rows);
        })
    }
 )

}



// getting link to edit
exports.edit=(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log('connected to database');


        // select the rows
        connection.query('select * from users where id = ?',[req.params.id],(err,rows)=>{
            connection.release();

            if(!err){
                res.render('edit_user',{ rows });
            }
            else{
                console.log(err);
            }
            console.log('the data from the users table is : \n ',rows);
        })
    }
)
}

// updating or editing
exports.update=(req,res)=>{
    const {first_name,last_name,email,phone,comments}=req.body;

    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log('connected to database');


        // select the rows
        connection.query('UPDATE users SET first_name= ?,last_name = ?,email = ?,phone = ?,comments = ?  where id = ?;',[first_name,last_name,email,phone,comments,req.params.id],(err,rows)=>{
            connection.release();

            if(!err){
                res.render('edit_user',{alert:'Edited successfully'});
            }
            else{
                console.log(err);
            }
            console.log('the data from the users table is : \n ',rows);
        })
    }
)

}


//deleting 
exports.delete=(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log('connected to database');


        // select the rows
        connection.query('delete from users where id = ? ',[req.params.id],(err,rows)=>{
            connection.release();

            if(!err){
                res.redirect('/');
            }
            else{
                console.log(err);
            }
            console.log('the data from the users table is : \n ',rows);
        })
    }
)

}

// viewing the respective data
exports.viewall=(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log('connected to database');


        // select the rows
        connection.query('select * from users where id = ?',[req.params.id],(err,rows)=>{
            connection.release();

            if(!err){
                res.render('view_all',{ rows });
            }
            else{
                console.log(err);
            }
            console.log('the data from the users table is : \n ',rows);
        })
    }
)


}