# LYRICLE is still under development and is due for release by the end of May 2022

## Lyricle - Project 4 @ GA (General Assembly) 

This was my final solo project on GA's Software Engineering Immersive course. 

![game-screenshot]

## Deployment 

This app has been deployed via Heroku and Netlify and is available [here](https://playlyricle.com/)

# Objective

- To build a full-stack application by making your own back-end and your own front-end.
- Use an Express API to serve your data from a Mongo database.
- Consume your API with a separate front-end built with React.
- Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models.
- Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut.
- Be deployed online so it’s publicly accessible.

# Languages / Frameworks / Databases used

- Django
- Python
- React
- Javascript
- SCSS
- HTML5

## Concept

This App was concieved as a spin off of the viral guessing game Wordle (guess the 5 letter word and get clues from correct letters guessed). In Lyricle however, the user is instead given the clues. These take shape as 5 seperate sections of a song that hint towards the songs title with the aim being to guess the song in as few guesses as possible. Users can also sign up and join leagues with their friends, to compete over specific artists. 

## Phase One (Days 1-2) 

**Entity Relationship Diagram (ERD) & Whiteboarding **

For my final project I wanted to create something that went beyond the structure of the apps we had worked with on the course. For this reason I wanted to create a game that was automated and would encourage multiple interactions. I was drawn to the idea of a daily guessing game that weaved in my passion for lyrics in music. 

The features I decided on delivering were:

- A daily song for users to guess
- Leagues that users could set up and join
- A scoreboard to compare users scores with those in their league
- A profile page to track overall stats

To wrap my head around the relationships between each aspect, I created an ERD using QuickDBD. This helped reinforce my grasp of Foreign Keys and Many to Many relationships. 

![ERD-diagram] 

## Phase Two (Days 3-5) 

**Python, Django and a SQL database** 

This was my first experience using Python and Django as well as a SQL database (PostgreSQL). I created sepeate models for each of the features listed earlier. Reffered to as Apps when using Django, these included the dailysongs, leagues, scores and profile. I incorporated a custom user model rand used JWT for authentication, rather than the default version provided by Django. 

```class LoginView(APIView):

    def get_user(self, email):

        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid credentials'})

    def post(self, request):
    
        email = request.data.get('email')
        password = request.data.get('password')

        user = self.get_user(email)
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid credentials'})

        token = jwt.encode({'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'message': f'Welcome back {user.username}!'})
```
The JWT used here encodes the users secret key as a series of JSON objects. Further to this I added serializers to only return the relevant information to the front end. 

## Phase Three (Days 6-7) 

**Building the Front End** 

Once I had the backend working successfully within postman, I could work on the front end, with a mobile first focus. Using React, I incorporated hooks like useEffect and useState and Axios for connecting requests from the front end to the back end. As i only had 7 days to complete this project, I decided to use a Bulma framework to speed up the styling process on the front end and ensure optimum mobile interaction. 

In order to populate the pages with accurate lyrics and to automate the game, i decided to use a lyrics scraper as an node package. This returns the lyrics from the genius API which i could manipulate to display the clues to the user. Below is an example of the many sections of string checking, looking for any instance of 'verse 4'. If this is found, the following fourty words are returned and of this, only 5 words are shown to the user. This is then set using the useState hook. 
```if (lyricsString.includes('Verse 4')) {
          const AfterEndingBracket = returnFourtyWords(
            lyricsString.substring(lyricsString.indexOf('Verse 4'))
          );
          const SevenWordsafter = returnFiveWords(
            AfterEndingBracket.substring(AfterEndingBracket.indexOf(']') + 1)
          )
            .replace(/\r?\n|\r/g, ' ')
            .toLowerCase();
          setClue1(SevenWordsafter);
        } else if (lyricsString.includes('Bridge')) {
          const AfterEndingBracket = returnFourtyWords(
            lyricsString.substring(lyricsString.indexOf('Bridge'))
          );
          const SevenWordsafter = returnFiveWords(
            AfterEndingBracket.substring(AfterEndingBracket.indexOf(']') + 1)
          )
            .replace(/\r?\n|\r/g, ' ')
            .toLowerCase();
          setClue1(SevenWordsafter);
        }
```
There are many 'if else' instances in this code as obviously not every song includes a verse 4. So if a song doesnt include one, the code checks if a bridge is included and then (not pictured in snippet), checks for verse 3, verse 2 and so on. 

## Wins

- Creating a full stack application in 7 days, that really consolidated my understanding of front/back end interaction. 
- Having a working demonstration (albeit on local host) for my presentation. It was incredibly rewarding to play this game with 25 people on zoom, and fulfiled my aim at the start of the project. 
- Python and SQL databases. I had only worked briefly with both of these technologies and i really enjoyed discovering the nuances of python compared to javascript and the idiosyncrasities of relationships in SQL databases. 
- Working with Django was a great time saver, with its admin portal and out of the box functionality. 

## Challenges

- It took me a fair while to come up with an idea that really excited me. This meant i lost a day or so of productive time however, I am glad i chose this as i now have project i am really passionate about and can develop into a fully functioning application as well as a demonstration of my full stack ability.
- Working with my own API as well as a third party (Genius). I really struggled to get my head around CORS issues. 

## Stretch Goals

- To fix the CORS issue
- Add in Artits for users to search for, so they can compete in an 'ABBA' fan group with their friends for example
- Incorporate a scoreboard after the user has finished their daily game

## Takeaways

- Building lyricle was the perfect challenge to consolidate all the Python, SQL and React knowledge i had learnt in the previos weeks. Whilst i had some teething with creating my ERD and interacting with Django for the first time, i found it was an incredibly quick and user friendly tool to whip up a back end. 
 

