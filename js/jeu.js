



/*****************************************************************VARIABLES*************************************************************************/



       
        var tabCases ;          // chacun des indices du tableau représente une case de la grille 0 = vide, 1 = j1, 2 = j2
        var partieFinie ;       //booléen qui définit si la partie est finie
        var nbCoups ;           // définit le nombre de coups joués 
        var joueur1 ;           // tableau associatif qui donne le score, le pion et la couleur
        var joueur2 ;
        var aQuiLeTour ;        // définit qui joue   1 = j1 , 2 = j2








/*****************************************************************FONCTIONS*************************************************************************/


        /* 
            fonction d'initialisation du jeu 
        */

        function initialisation(){
            tabCases = [0,0,0,0,0,0,0,0,0] ;  
            partieFinie = false ;
            nbCoups = 0 ;
            aQuiLeTour = 0 ;
            resetGrilleStocks();
            resetModales();
            Custombox.open({    
                target: '#modalPions',
                effect: 'door'
            });
            
        }


        /*
            fonction qui teste si il y a un gagnant en testant les huit combinaisons gagnantes
            @return retourne le joueur gagnant 0 = match nul, 1 = j1, 2 = j2
        */
 
        function finDePartie(){
            var gagnant = 0;                
            if(tabCases[0] == tabCases[1] && tabCases[1] == tabCases[2] && tabCases[2] != 0 && !partieFinie){     // ligne 1
                gagnant = tabCases[0];
                partieFinie = true;
            }
            if(tabCases[3] == tabCases[4] && tabCases[4] == tabCases[5] && tabCases[5] != 0 && !partieFinie){     // ligne 2
                gagnant = tabCases[3];
                partieFinie = true;
            }
            if(tabCases[6] == tabCases[7] && tabCases[7] == tabCases[8] && tabCases[8] != 0 && !partieFinie){     // ligne 3
                gagnant = tabCases[6];
                partieFinie = true;
            }
            if(tabCases[0] == tabCases[3] && tabCases[3] == tabCases[6] && tabCases[6] != 0 && !partieFinie){     // colonne 1     
                gagnant = tabCases[0];
                partieFinie = true;
            }
            if(tabCases[1] == tabCases[4] && tabCases[4] == tabCases[7] && tabCases[7] != 0 && !partieFinie){     // colonne 2
                gagnant = tabCases[1];
                console.log(gagnant);
                partieFinie = true;
            }
            if(tabCases[2] == tabCases[5] && tabCases[5] == tabCases[8] && tabCases[8] != 0 && !partieFinie){     // colonne 3
                gagnant = tabCases[2];
                partieFinie = true;
            }
            if(tabCases[0] == tabCases[4] && tabCases[4] == tabCases[8] && tabCases[8] != 0 && !partieFinie){     // diagonale descendante
                gagnant = tabCases[0];
                partieFinie = true;
            }
            if(tabCases[6] == tabCases[4] && tabCases[4] == tabCases[2] && tabCases[2] != 0 && !partieFinie){     // diagonale montante
                gagnant = tabCases[6];
                partieFinie = true;
            }
            if(nbCoups == 9){             // grille remplie                                                                       
                partieFinie = true;
            }
            if(partieFinie){                  // si il y a un gagnant, désactive la grille et les stocks de pions
                $('.stockPionsJ1').css('pointer-events', 'none');
                $('.stockPionsJ2').css('pointer-events', 'none');
                $('.case').css('pointer-events', 'none');
          }
            return gagnant;
        }


        
        /*
            fonction qui définit qui commence
        */

        function quiCommence(){
            aQuiLeTour = (Math.floor(Math.random() * (3 - 1)) + 1);         //renvoie 1 ou 2 aléatoirement
            if(aQuiLeTour == 1) {                                           //si joueur 1 commence
                $('.stockPionsJ1').css('pointer-events', 'auto');           //active le stock de J1      
                $('.sous-titre').html('Joueur 1 commence !');               //met à jour le sous-titre  
            } else {                                                        //si joueur 2 commence
                $('.stockPionsJ2').css('pointer-events', 'auto');           //active le stock de J2
                $('.sous-titre').html('Joueur 2 commence !');               //met à jour le sous-titre          
            }
        }


        /*
            Reinitialisation des choix pions/couleurs des modales
        */

        function resetModales(){
            $('.choixPionJ1, .choixPionJ2').css('color', 'black');
            $('.choixCouleurJ1, .choixCouleurJ2').css('border', 'none');
        }

        /*
            fonction qui reset la grille et les stocks
        */

        function resetGrilleStocks(){
            $('.case').find('i').attr('class', '');
            $('.stockPionsJ1, .stockPionsJ2').css('visibility', 'visible');



        }






        /*************************************************************EVENTS*************************************************************************/




        $('.choixPionJ1').click(function(){                                               //quand le joueur choisit un pion :
            var classPion = 'fa ' + $(this).attr('class').split(' ')[1];                  //récupère la classe fa-xxx en position 2 de l'attribut classe
            $('.choixPionJ1').css('color', 'black');                                      //remet tous les pions en noirs
            $(this).css('color', '#4C688A');                                              //met le pion choisi en bleu 
            $('.stockPionsJ1').find('i').attr('class', '').addClass(classPion);           //donne la classe fa-xxx au stock de pions
            joueur1['pion'] = classPion;                                                  //remplace le pion dans l'objet joueur1
        });


        $('.choixPionJ2').click(function(){                                               //idem J1
            var classPion = 'fa ' + $(this).attr('class').split(' ')[1];
            $('.choixPionJ2').css('color', 'black');
            $(this).css('color', '#4C688A');
            $('.stockPionsJ2').find('i').attr('class', '').addClass(classPion);
            joueur2['pion'] = classPion;
        });


        $('.choixCouleurJ1').click(function(){                                             //quand le joueur choisit une couleur :
            var codeCouleur = rgb2hex($(this).css('background-color'));                    //récupère la couleur choisie et la transforme en hexa
            $('.choixCouleurJ1').css('border', 'none');                                    //remet toutes les couleurs sans bordure
            $(this).css('border', '2px solid black');                                      //ajoute une bordure à la couleur choisie
            $('.titre').css('background-color', codeCouleur);                              //change la couleur du titre suivant la couleur choisie par J1
            $('.stockPionsJ1').find('i').css('color', codeCouleur);                        //remplace la couleur du stock selon la couleur choisie
            joueur1['couleur'] = codeCouleur;                                              //remplace la couleur dans l'objet joueur1
        });


         $('.choixCouleurJ2').click(function(){                                            //idem J1
            var codeCouleur = rgb2hex($(this).css('background-color'));
            $('.choixCouleurJ2').css('border', 'none');
            $(this).css('border', '2px solid black');
            $('.stockPionsJ2').find('i').css('color', codeCouleur);
            $('.play').css('background-color', codeCouleur);                               //change la couleur de play suivant la couleur choisie par J2
            joueur2['couleur'] = codeCouleur;
        });


 
        $('#play').click(function(){                  //Ouvre une modale permettant de choisir ses pions et sa couleur
            initialisation();
        });



        $('.ok-pions').click(function(){               // Ferme la modale pions et ouvre la modale couleur
            Custombox.close();
            Custombox.open({ 
                target: '#modalCouleurs', 
                effect: 'door' 
            });
        });



        $('.ok-couleurs').click(function(){             // ferme la modale couleur
            Custombox.close();
            quiCommence();
        });


        

        $('#play').hover(                                                  //Change la couleur du bouton play au survol
            // handlerin 
            function(){                          
                var colorTitre = $('.titre').css('background-color');      //récupère la couleur en rgb de fond du titre
                var colorPlay = $('.play').css('background-color');        //récupère la couleur en rgb du  bandeau play                                
                if( colorTitre != colorPlay) {                             //si les deux couleurs sont différentes, 
                    $(this).css('color', rgb2hex(colorTitre));             //on applique au play:hover la couleur du titre transformée en hexa
                } else {                                                   //sinon
                    $(this).css('color', '#ffffff');                       //on applique au play:hover la couleur blanc
                }                   
            }, 
            // handlerout
            function(){
                $(this).css('color', '#000000');
            }
        );


        
        $('.stockPionsJ1, .stockPionsJ2').hover(                         //augmente la taille des pions au survol
            // handlerin
            function(){
                TweenMax.to($(this).find("i"), 0.33, {css : {scaleX : 1.2 , scaleY : 1.2}, ease : Circ.easeOut});
            },
            // handlerout
            function(){
               TweenMax.to($(this).find("i"), 0.33, {css : {scaleX : 1 , scaleY : 1}, ease : Circ.easeOut});
            }
        );


        
        $('.stockPionsJ1, .stockPionsJ2').click(function(){         
            $(this).css('visibility', 'hidden');                                 //cache le pion sur lequel un joueur a cliqué
            $('.stockPionsJ1, .stockPionsJ2').css('pointer-events', 'none');     //désactive les stocks
            $('.case').css('pointer-events', 'auto');                            //active les cases de la grille
        });

        $('.case').click(function(){
            var index = parseInt($(this).attr('id'));
            var gagnant = 0;
            if(aQuiLeTour == 1){                                                                //Si joueur 1 joue :
                $(this).find('i').addClass(joueur1.pion).css('color', joueur1.couleur);         //ajoute la classe fa du joueur 1 et sa couleur
                aQuiLeTour = 2;                                                                 //passe le tour à joueur 2
                $('.sous-titre').html('Au tour de Joueur 2');
                $('.case').css('pointer-events', 'none');                                       //désactive les cases
                $('.stockPionsJ2').css('pointer-events', 'auto');                               //active le stock de joueur 2
                tabCases[index] = 1;
            } else {
                $(this).find('i').addClass(joueur2.pion).css('color', joueur2.couleur);         //idem j1
                aQuiLeTour = 1;
                $('.sous-titre').html('Au tour de Joueur 1');
                $('.case').css('pointer-events', 'none');
                $('.stockPionsJ1').css('pointer-events', 'auto');
                tabCases[index] = 2;
            }

            nbCoups++;                                                                          //incrémente le nombre de coups

            if(nbCoups>=5){                                                                     //à partir de cinq coups joués, vérifie si la partie est finie
                gagnant = finDePartie();
            }

            if(partieFinie){                                                                    //si la partie est finie :           
                if(gagnant == 1){                                                               //si gagnant = joueur 1 :
                    $('.sous-titre').html('Vainqueur : J1');                                    //affiche le gagnant 
                    joueur1.score += 1;                                                         //incrémente le score de joueur 1
                    $('.pointsJ1').html(' : ' + joueur1.score);                                 //affiche le score de joueur 1
                } else if (gagnant == 2){                                                       //idem si gagnant = joueur 2
                    $('.sous-titre').html('Vainqueur : J2'); 
                    joueur2.score += 1;
                    $('.pointsJ2').html(' : ' + joueur2.score);
                } else {                                                                         //si il n'y a pas de gagnant :
                    $('.sous-titre').html('Match nul');                                          //affiche "match nul"
                }
            }


        });

        /*
            Redimensionne la grille en fonction de la taille de l'ecran
        */

        function resizeGame(){
            $('.case').css({
                'height' : $('.case').width(),
                'line-height' : $('.case').width()+'px'
            });
        }


        /*
            fonction qui transforme une couleur RGB en Hex web
            @param rgb : couleur RBG à transformer
            @return : la couleur Hex correspondante
        */
        function rgb2hex(rgb) {
            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }
 
        $(window).resize(function(){           
                resizeGame();
        });

        $(document).ready(function(){
            resizeGame();

            
            $('.stockPionsJ1, .stockPionsJ2, .case').css('pointer-events', 'none');
            joueur1 = {
                'score' : 0 , 
                'pion' : 'fa fa-times', 
                'couleur' : '#34475E'
            };
            joueur2 = {
                'score' : 0,
                'pion' : 'fa fa-circle-o', 
                'couleur' : '#37B06D'
            };
        });

    