//based on month
const zodiacSigns = [
    "Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer",
    "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn"
];

//size of 31
const compliments = [
    "You have a great sense of humor!",
    "You are incredibly kind!",
    "You light up the room!",
    "You are a fantastic friend!",
    "Your positivity is contagious!",
    "You have a brilliant mind!",
    "You are an amazing listener!",
    "You are so creative!",
    "You inspire those around you!",
    "Your energy is uplifting!",
    "You have a beautiful heart!",
    "You are truly talented!",
    "You have an incredible smile!",
    "You make the world a better place!",
    "You radiate confidence!",
    "You are a wonderful person!",
    "You are so thoughtful!",
    "You are full of wisdom!",
    "You bring joy to those around you!",
    "Your kindness is a gift!",
    "You are unique and special!",
    "You always see the good in people!",
    "Your laughter is infectious!",
    "You are a natural leader!",
    "You are deeply loved!",
    "You have a strong and beautiful soul!",
    "You are so compassionate!",
    "You have a heart of gold!",
    "You make people feel valued!",
    "You are an incredible human being!",
    "You have a great sense of style!"
];

//size of 20
const victimCardCompliments = [
    "You always endure so much, yet you keep going!",
    "No one understands your struggles like you do!",
    "You deserve way more appreciation for all you go through!",
    "You're always the one who gives, but who gives to you?",
    "Life keeps testing you because you're the strongest!",
    "People don't realize how much you sacrifice!",
    "You always put others first, even when no one notices!",
    "You’re too kind, and that’s why people take advantage of you!",
    "You deserve better than what life throws at you!",
    "You carry so much pain, yet you still smile!",
    "You're always misunderstood, but you stay true to yourself!",
    "People don’t see how much effort you put in!",
    "If only people treated you the way you treat them!",
    "You're too good for this world, and that's why it’s hard!",
    "The universe always gives you the hardest battles!",
    "You give so much, yet people take you for granted!",
    "You’re always there for others, but who’s there for you?",
    "You handle everything alone, and that's not fair!",
    "People don’t appreciate you as much as they should!",
    "Your kindness is both your strength and your curse!"
];


//size of 30
const lifeRecommendations = [
    "Feed a street dog and show kindness to animals.",
    "Take a walk in nature and appreciate the beauty around you.",
    "Practice gratitude by writing down three things you're thankful for.",
    "Help a stranger without expecting anything in return.",
    "Read a book that expands your knowledge and perspective.",
    "Meditate for a few minutes to calm your mind.",
    "Drink more water and take care of your body.",
    "Spend quality time with your loved ones.",
    "Smile at someone and make their day better.",
    "Limit your screen time and enjoy the present moment.",
    "Donate old clothes or items to someone in need.",
    "Plant a tree or care for a plant in your home.",
    "Listen more and speak less in conversations.",
    "Take a break from social media and focus on real-life interactions.",
    "Wake up early and enjoy the peaceful morning hours.",
    "Write down your goals and work towards them.",
    "Learn a new skill that interests you.",
    "Practice deep breathing to reduce stress.",
    "Forgive someone and let go of grudges.",
    "Avoid negative self-talk and be kinder to yourself.",
    "Do a random act of kindness for someone.",
    "Cook a homemade meal and enjoy the process.",
    "Exercise regularly to stay fit and healthy.",
    "Be patient with yourself and your progress.",
    "Avoid gossip and focus on positive conversations.",
    "Listen to calming music to relax your mind.",
    "Try something new that takes you out of your comfort zone.",
    "Reflect on your day and learn from experiences.",
    "Encourage someone who is struggling.",
    "Believe in yourself and your abilities."
];

//size 20
const futurePredictions = [
    "You will become a crorepati soon!",
    "A big opportunity is coming your way!",
    "You will travel to your dream destination!",
    "Success and wealth are on the horizon for you!",
    "You will meet someone who will change your life!",
    "Your hard work will finally pay off!",
    "A surprise gift is coming your way!",
    "You will achieve your biggest goal this year!",
    "Happiness and peace will fill your life!",
    "You will buy your dream house soon!",
    "A long-lost friend will reconnect with you!",
    "You will get an unexpected financial gain!",
    "Your career will take a major leap forward!",
    "You will find love and deep connection soon!",
    "Luck is on your side in the coming months!",
    "You will be recognized for your talents!",
    "A great adventure awaits you!",
    "Your business idea will be a huge success!",
    "You will inspire many people with your journey!",
    "Your dreams are turning into reality soon!"
];
const form=document.getElementById('astroFrom');
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const Name=document.getElementById('name').value;
    const Surname=document.getElementById('surname').value;
    const Day=Number(document.getElementById('day').value);
    const Month=Number(document.getElementById('month').value);
    const Year=Number(document.getElementById('year').value);

    const result=document.getElementById('result');

    const first_message=`Hello ${Name} ${Surname}.`;

    const second_message=`Your Zodiac Sign is ${zodiacSigns[Month-1]}`;
    
    const third_Message=compliments[Day-1];

    let index=Math.floor(Math.random()*20);
    const fourth_message=victimCardCompliments[index];

    index=(Name.length*Surname.length*Year)%30;
    const fifth_message=lifeRecommendations[index];

    index=(Day*Month*Year)%20;
    const sixth_message=lifeRecommendations[index];

    result.innerText=`${first_message} ${second_message} ${third_Message} ${fourth_message} Our Reccomendation for You: ${fifth_message} Your Future Prediction is: ${sixth_message}`;
})







// const form=document.getElementById('astroFrom');
// form.addEventListener('submit',(event)=>{
//     event.preventDefault();
//     const Name=document.getElementById('name').value;
//     const Surname=document.getElementById('surname').value;
//     const Day=Number(document.getElementById('day').value);
//     const Month=Number(document.getElementById('month').value);
//     const Year=Number(document.getElementById('year').value);

//     const result=document.getElementById('result');

//     const first_message=`Hello ${Name} ${Surname}.`;

//     const second_message=`Your Zodiac Sign is ${zodiacSigns[Month-1]}`;
    
//     const third_Message=compliments[Day-1];

//     let index=Math.floor(Math.random()*20);
//     const fourth_message=victimCardCompliments[index];

//     index=(Name.length*Surname.length*Year)%30;
//     const fifth_message=lifeRecommendations[index];

//     index=(Day*Month*Year)%20;
//     const sixth_message=lifeRecommendations[index];


//     result.innerText=`${first_message} ${second_message} ${third_Message} ${fourth_message} Our Reccomendation for You: ${fifth_message} Your Future Prediction is: ${sixth_message}`;


// })


