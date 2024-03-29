
/////////////////////////////////////////////////////////////////////////////////
// database
//
// http://www.phloxblog.in/developing-web-application-node-js-express-js-mysql/#.UkCHDoZUS3U
/////////////////////////////////////////////////////////////////////////////////

exports.getOne_sensor_info = function( sensor_id ) {
    return 'SELECT * FROM sensor_info where id = ' + sensor_id +' ;' ;
}
exports.getAll_sensor_info = function(  ) {
    return 'SELECT * FROM sensor_info ;' ;
}
exports.getDaily_sensor_data = function( sensor_id, date, option) {
    // sensor_id: 1
    // data format: '2013-10-03'
    var select_type;
    if(typeof option == 'undefined')
        select_type = 'avg';
    else if(option == 'min')
        select_type = 'min';
    else if(option == 'max')
        select_type = 'max';
    else
        select_type = 'avg';
     
    var ret_data = 
"    select 0 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "   
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 00:00:00') and timestamp('" + date + " 01:00:00')   "
+"   "    
+"    union   "
+"    select 1 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 01:00:00') and timestamp('" + date + " 02:00:00')   "
+"   "    
+"    union   "
+"    select 2 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 02:00:00') and timestamp('" + date + " 03:00:00')   "
+"   "    
+"    union   "
+"    select 3 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 03:00:00') and timestamp('" + date + " 04:00:00')   "
+"   "    
+"    union   "
+"    select 4 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 04:00:00') and timestamp('" + date + " 05:00:00')   "
+"   "    
+"    union   "
+"    select 5 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 05:00:00') and timestamp('" + date + " 06:00:00')   "
+"       "
+"    union   "
+"    select 6 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 06:00:00') and timestamp('" + date + " 07:00:00')   "
+"   "    
+"    union   "
+"    select 7 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 07:00:00') and timestamp('" + date + " 08:00:00')   "
+"   "    
+"    union   "
+"    select 8 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 08:00:00') and timestamp('" + date + " 09:00:00')   "
+"   "    
+"    union   "
+"    select 9 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 09:00:00') and timestamp('" + date + " 10:00:00')   "
+"   "    
+"    union   "
+"    select 10 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 10:00:00') and timestamp('" + date + " 11:00:00')   "
+"   "    
+"    union   "
+"    select 11 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 11:00:00') and timestamp('" + date + " 12:00:00')   "
+"   "    
+"    union   "
+"    select 12 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 12:00:00') and timestamp('" + date + " 13:00:00')   "
+"   "    
+"    union   "
+"    select 13 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 13:00:00') and timestamp('" + date + " 14:00:00')   "
+"   "    
+"    union   "
+"    select 14 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 14:00:00') and timestamp('" + date + " 15:00:00')   "
+"   "    
+"    union   "
+"    select 15 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 15:00:00') and timestamp('" + date + " 16:00:00')   "
+"   "    
+"    union   "
+"    select 16 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 16:00:00') and timestamp('" + date + " 17:00:00')   "
+"   "    
+"    union   "
+"    select 17 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 17:00:00') and timestamp('" + date + " 18:00:00')   "
+"   "    
+"    union   "
+"    select 18 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 18:00:00') and timestamp('" + date + " 19:00:00')   "
+"   "    
+"    union   "
+"    select 19 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 19:00:00') and timestamp('" + date + " 20:00:00')   "
+"   "    
+"    union   "
+"    select 20 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 20:00:00') and timestamp('" + date + " 21:00:00')   "
+"   "    
+"    union   "
+"    select 21 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 21:00:00') and timestamp('" + date + " 22:00:00')   "
+"   "    
+"    union   "
+"    select 22 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 22:00:00') and timestamp('" + date + " 23:00:00')   "
+"   "    
+"    union   "
+"    select 23 as 'data_time',  " + select_type + "(sd.data) as  " + select_type + " from sensor_data sd   "
+"    where sd.sensor_id = " + sensor_id + "   "
+"    AND sd.created_at between timestamp('" + date + " 23:00:00') and timestamp('" + date + " 23:59:59');   "
    return ret_data;
}

//////////////////////////////////////////////////////////////////////////

exports.ttt = function( ) {
        var ret_data = 
"    select 0 as 'data_time', avg(sd.data) as avg from sensor_data sd   "   
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 00:00:00') and timestamp('2013-10-03 01:00:00')   "
    return ret_data;
}


exports.getDaily_sensor_data_sample = function( sensor_id, date) {
    var ret_data = 
"    select 0 as 'data_time', avg(sd.data) as avg from sensor_data sd   "   
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 00:00:00') and timestamp('2013-10-03 01:00:00')   "
+"   "    
+"    union   "
+"    select 1 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 01:00:00') and timestamp('2013-10-03 02:00:00')   "
+"   "    
+"    union   "
+"    select 2 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 02:00:00') and timestamp('2013-10-03 03:00:00')   "
+"   "    
+"    union   "
+"    select 3 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 03:00:00') and timestamp('2013-10-03 04:00:00')   "
+"   "    
+"    union   "
+"    select 4 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 04:00:00') and timestamp('2013-10-03 05:00:00')   "
+"   "    
+"    union   "
+"    select 5 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 05:00:00') and timestamp('2013-10-03 06:00:00')   "
+"       "
+"    union   "
+"    select 6 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 06:00:00') and timestamp('2013-10-03 07:00:00')   "
+"   "    
+"    union   "
+"    select 7 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 07:00:00') and timestamp('2013-10-03 08:00:00')   "
+"   "    
+"    union   "
+"    select 8 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 08:00:00') and timestamp('2013-10-03 09:00:00')   "
+"   "    
+"    union   "
+"    select 9 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 09:00:00') and timestamp('2013-10-03 10:00:00')   "
+"   "    
+"    union   "
+"    select 10 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 10:00:00') and timestamp('2013-10-03 11:00:00')   "
+"   "    
+"    union   "
+"    select 11 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 11:00:00') and timestamp('2013-10-03 12:00:00')   "
+"   "    
+"    union   "
+"    select 12 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 12:00:00') and timestamp('2013-10-03 13:00:00')   "
+"   "    
+"    union   "
+"    select 13 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 13:00:00') and timestamp('2013-10-03 14:00:00')   "
+"   "    
+"    union   "
+"    select 14 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 14:00:00') and timestamp('2013-10-03 15:00:00')   "
+"   "    
+"    union   "
+"    select 15 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 15:00:00') and timestamp('2013-10-03 16:00:00')   "
+"   "    
+"    union   "
+"    select 16 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 16:00:00') and timestamp('2013-10-03 17:00:00')   "
+"   "    
+"    union   "
+"    select 17 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 17:00:00') and timestamp('2013-10-03 18:00:00')   "
+"   "    
+"    union   "
+"    select 18 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 18:00:00') and timestamp('2013-10-03 19:00:00')   "
+"   "    
+"    union   "
+"    select 19 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 19:00:00') and timestamp('2013-10-03 20:00:00')   "
+"   "    
+"    union   "
+"    select 20 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 20:00:00') and timestamp('2013-10-03 21:00:00')   "
+"   "    
+"    union   "
+"    select 21 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 21:00:00') and timestamp('2013-10-03 22:00:00')   "
+"   "    
+"    union   "
+"    select 22 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 22:00:00') and timestamp('2013-10-03 23:00:00')   "
+"   "    
+"    union   "
+"    select 23 as 'data_time', avg(sd.data) as avg from sensor_data sd   "
+"    where sd.sensor_id = 1   "
+"    AND sd.created_at between timestamp('2013-10-03 23:00:00') and timestamp('2013-10-03 23:59:59');   "
    return ret_data;
}
