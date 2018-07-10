	
$( document ).ready(function() {
	$('#filter').keyup(function () {

        var rex = new RegExp($(this).val(), 'i');
        $('.searchable tr').hide();
        $('.searchable tr').filter(function () {
        return rex.test($(this).text());
        }).show();
	});
	
    get_all_music();
});

function get_all_music()
{
	//alert("Hello World");
	
	jQuery.ajax({
            type: "GET",
            url: 'http://localhost:3000/music/',
			crossDomain: true,
            beforeSend: function (xhr) {
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            },
            success: function (data)
            {
            //alert(data.length);
				if(data){
					var len = data.length;
					var txt = "";
					if(len > 0){
						for(var i=0;i<len;i++){
							if(data[i].id && data[i].song && data[i].artist && data[i].album && data[i].length){
								txt += "<tr><td>"+data[i].id+"</td><td>"+data[i].song+"</td><td>"+data[i].artist+"</td><td>"+data[i].album+"</td><td>"+data[i].length+"</td><td><button type='button' data-toggle='modal' data-target='#editModal' class='btn btn-default custom1' onclick='get_music_data_by_id("+data[i].id+");'>Edit</button></td><td><button type='button'  id='button' class='btn btn-danger custom1' onclick='delete_music_by_id("+data[i].id+");'>Delete</button></td></tr>";
                            }
						}
						if(txt != ""){
							$("#table tbody").html("");
							$("#table").append(txt).removeClass("hidden");
                        }
					}
				}
            }

        });
	
	
}

function delete_music_by_id(song_id)
{
	var ans=confirm("Are you sure to delete this song ?")
	if(ans)
	{
		//alert(song_id);
		
		$.ajax({
			url: 'http://localhost:3000/music/'+song_id,
			type: 'DELETE',
			success: function(data) {

				alert('Your song has been deleted');
				get_all_music();
			}
		});
		
		
		
	}
}

function get_music_data_by_id(song_id)
{
	$.ajax({
			url: 'http://localhost:3000/music/'+song_id,
			type: 'GET',
			success: function(data) {
				//alert(data.song);
				jQuery("input[id=edit_id]").val(data.id);
				jQuery("input[id=edit_song]").val(data.song);
				jQuery("input[id=edit_artist]").val(data.artist);
				jQuery("input[id=edit_album]").val(data.album);
				jQuery("input[id=edit_length]").val(data.length);
			}
		});
}

function new_song()
{
	$.ajax({
		url: 'http://localhost:3000/music/',
		type: 'POST',
		data: jQuery( "form[id=form_new_music]" ).serialize(),
		success: function(data) {
			alert("Successfully Inserted Data.");
			$('#myModal').modal('hide');
			jQuery( "form[id=form_new_music]" ).trigger("reset");
			get_all_music();
		}
	});
	
	return false;
}

function update_song()
{
	$.ajax({
		url: 'http://localhost:3000/music/',
		type: 'POST',
		data: jQuery( "form[id=form_edit_music]" ).serialize(),
		success: function(data) {
			alert("Successfully Updated Data.");
			$('#editModal').modal('hide');
			jQuery( "form[id=form_edit_music]" ).trigger("reset");
			get_all_music();
		}
	});
	
	return false;
}

