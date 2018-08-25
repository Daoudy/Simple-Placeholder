    <script type="text/javascript" src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script type="text/javascript">
        String.prototype.capitalize = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }
        
        // Quand le document est prêt :
        $(document).ready(function(){
            // On demande via une requête AJAX à récupérer les auteurs en JSON
            $.getJSON('https://jsonplaceholder.typicode.com/users', function(users){
                // Quand on les a reçu, on va boucler sur la auteurs
               $(users).each(function(i, user){
                   // Pour chaque auteur, on créé un <li> qui contient un attribut
                   // data-id qui contient son id et le <li> contient le name de l'auteur
                   var li = '<li data-id="'+user.id+'">'+user.name+'</li>';
                   // On rajoute le <li> au <ul> qui a l'identifiant users
                   $('#users').append(li);
               }) 
            });
            
            // Quand on clique sur le <ul> qui a l'identifiant users, plus particulièrement sur un de ses <li>
            $('#users').on('click', 'li', function(){
                // On récupère l'id du <li> sur lequel on a cliqué et qui représenté ici par
                // la variable this et grâce à la fonction .data de jQuery
                var id = $(this).data('id');
                // On fait disparaitre lentement les articles
                $('#articles').fadeOut(500, function(){
                    // Quand la disparition a fini
                    // On vide les articles
                    $('#articles').html('');
                    // On appelle l'url qui nous rend les articles de l'utilisateur grâce à son ID
                    $.getJSON('https://jsonplaceholder.typicode.com/users/' + id + '/posts', function(posts){
                        // Une fois qu'on a reçu la liste des articles
                        $(posts).each(function(i, post){
                            // Pour chaque article
                            // On créé une balise article
                            var article = '<article>';
                            // Dans l'article on place un <h3> qui contient le title de l'article
                            article += '<h3>' + post.title.capitalize() + '</h3>';
                            // Puis on place un <p> qui contient le body de l'article
                            article += '<p>' + post.body.capitalize() + '</p>';
                            // On ferme l'article
                            article += '</article>';
                            // On place un <hr> qui va séparer les articles
                            article += '<hr>';
                            // On ajoute tout ce code à la div qui a l'identifiant articles
                            $('#articles').append(article);
                        });
                        // Quand on a tout placé, on fait apparaitre la div articles 
                        $('#articles').fadeIn(500);
                    });    
                });
            });
        });
        
    </script>