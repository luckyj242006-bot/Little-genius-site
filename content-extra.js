"use strict";
/* Riddles, "Epics & tales" quiz topic, fun facts and puzzle data. Uses Q() from content-topics.js */
const CX = {};

CX.RIDDLES = [
 Q(1,'🐱','I say “meow” and love milk. Who am I?','Cat|Dog|Cow','मैं “म्याऊँ” कहती हूँ और दूध पसंद करती हूँ। मैं कौन हूँ?','बिल्ली|कुत्ता|गाय'),
 Q(1,'☀️','I am big, round and yellow. I shine in the sky all day. What am I?','The Sun|The Moon|A kite','मैं बड़ा, गोल और पीला हूँ। मैं दिन भर आसमान में चमकता हूँ। मैं क्या हूँ?','सूरज|चाँद|पतंग'),
 Q(1,'🐘','I have a long trunk and big ears. Who am I?','Elephant|Rabbit|Duck','मेरी लंबी सूँड और बड़े कान हैं। मैं कौन हूँ?','हाथी|ख़रगोश|बत्तख़'),
 Q(1,'🍌','I am a yellow fruit. Monkeys love me. What am I?','Banana|Apple|Grapes','मैं एक पीला फल हूँ। बंदर मुझे बहुत पसंद करते हैं। मैं क्या हूँ?','केला|सेब|अंगूर'),
 Q(1,'🌙','I come out at night and change my shape. What am I?','The Moon|A bus|A tree','मैं रात को निकलता हूँ और अपना आकार बदलता हूँ। मैं क्या हूँ?','चाँद|बस|पेड़'),
 Q(2,'⏰','I have two hands but I cannot clap. What am I?','A clock|A cat|A shoe','मेरे दो हाथ हैं पर मैं ताली नहीं बजा सकती। मैं क्या हूँ?','घड़ी|बिल्ली|जूता'),
 Q(2,'🚌','I have wheels and carry children to school. What am I?','A bus|A boat|A bed','मेरे पहिए हैं और मैं बच्चों को स्कूल ले जाती हूँ। मैं क्या हूँ?','बस|नाव|पलंग'),
 Q(2,'❄️','I am white and cold. I fall from the sky on the hills in winter. What am I?','Snow|Sand|Salt','मैं सफ़ेद और ठंडी हूँ। मैं सर्दियों में पहाड़ों पर आसमान से गिरती हूँ। मैं क्या हूँ?','बर्फ़|रेत|नमक'),
 Q(2,'✏️','You use me to write and draw. I get shorter when you sharpen me. What am I?','A pencil|A spoon|A comb','तुम मुझसे लिखते और चित्र बनाते हो। छीलने पर मैं छोटी हो जाती हूँ। मैं क्या हूँ?','पेंसिल|चम्मच|कंघी'),
 Q(2,'📖','I have pages but I am not a tree. You read me. What am I?','A book|A bag|A bird','मेरे पन्ने हैं पर मैं पेड़ नहीं हूँ। तुम मुझे पढ़ते हो। मैं क्या हूँ?','किताब|थैला|चिड़िया'),
 Q(2,'☂️','I open up when it rains, to keep you dry. What am I?','An umbrella|A window|A drum','बारिश में मैं खुल जाता हूँ ताकि तुम भीगो नहीं। मैं क्या हूँ?','छाता|खिड़की|ढोल'),
 Q(3,'🎹','I have keys but I cannot open a door. What am I?','A piano|A lock|A bucket','मेरे पास चाबियाँ हैं पर मैं दरवाज़ा नहीं खोल सकता। मैं क्या हूँ?','पियानो|ताला|बाल्टी'),
 Q(3,'🍾','I have a neck but no head. What am I?','A bottle|A giraffe|A hat','मेरी गर्दन है पर सिर नहीं। मैं क्या हूँ?','बोतल|जिराफ़|टोपी'),
 Q(3,'👣','The more of me you take, the more you leave behind. What am I?','Footsteps|Pencils|Sweets','मुझे जितना लेते हो, उतना ही पीछे छोड़ते जाते हो। मैं क्या हूँ?','क़दम|पेंसिलें|मिठाइयाँ'),
 Q(3,'🧽','I am full of holes but I can still hold water. What am I?','A sponge|A net|A basket','मुझमें बहुत छेद हैं पर मैं पानी रोक लेता हूँ। मैं क्या हूँ?','स्पंज|जाल|टोकरी'),
 Q(3,'🧵','I have an eye but I cannot see. What am I?','A needle|A potato|A storm','मेरी एक आँख है पर मैं देख नहीं सकती। मैं क्या हूँ?','सुई|आलू|तूफ़ान'),
 Q(4,'🥚','You must break me before you can use me. What am I?','An egg|A stone|A glass','मुझे इस्तेमाल करने से पहले तोड़ना पड़ता है। मैं क्या हूँ?','अंडा|पत्थर|काँच'),
 Q(4,'💌','I travel around the world but stay in one corner. What am I?','A stamp|A plane|A cloud','मैं पूरी दुनिया घूमता हूँ पर एक कोने में ही रहता हूँ। मैं क्या हूँ?','डाक टिकट|हवाई जहाज़|बादल'),
 Q(4,'🪮','I have many teeth but I cannot bite. What am I?','A comb|A shark|A dog','मेरे बहुत दाँत हैं पर मैं काट नहीं सकती। मैं क्या हूँ?','कंघी|शार्क|कुत्ता'),
 Q(4,'🕳️','I get wetter the more I dry things. What am I?','A towel|A cup|A tap','मैं जितना चीज़ें सुखाता हूँ, उतना ही गीला होता हूँ। मैं क्या हूँ?','तौलिया|कप|नल'),
 Q(4,'🌬️','You can hear me, but you cannot see or touch me. I repeat what you say. What am I?','An echo|A shadow|A mirror','तुम मुझे सुन सकते हो, पर देख या छू नहीं सकते। तुम जो कहते हो, मैं दोहराता हूँ। मैं क्या हूँ?','प्रतिध्वनि|परछाईं|आईना')
];

/* a quiz topic added to Explore */
CT.TOPICS.push({id:'epics', e:'🪔', en:'Epics & tales', hi:'महाकाव्य और कथाएँ', c:'--lilac', q:[
 Q(1,'🐒','Who flew across the ocean to find Sita?','Hanuman|Bhima|Arjuna','सीता माता को खोजने के लिए समुद्र पार किसने छलाँग लगाई?','हनुमान|भीम|अर्जुन'),
 Q(1,'🐭','In the Aesop story, who set the lion free from the net?','A mouse|A bird|A rabbit','ईसप की कहानी में शेर को जाल से किसने छुड़ाया?','चूहे ने|चिड़िया ने|ख़रगोश ने'),
 Q(2,'💪','Which Pandava brother was very strong and loved food?','Bhima|Nakula|Sahadeva','कौन-सा पांडव भाई बहुत बलवान था और खाने का शौक़ीन था?','भीम|नकुल|सहदेव'),
 Q(2,'👸','Who is Rama’s wife?','Sita|Radha|Draupadi','राम की पत्नी कौन हैं?','सीता|राधा|द्रौपदी'),
 Q(2,'🍑','Momotaro the Japanese hero was found inside a giant…','Peach|Mango|Egg','जापानी वीर मोमोतारो एक विशाल… के अंदर मिला था।','आड़ू|आम|अंडा'),
 Q(2,'🍒','Which kind old lady offered Rama her berries?','Shabari|Kunti|Mandodari','किस दयालु बूढ़ी माँ ने राम को बेर खिलाए?','शबरी|कुंती|मंदोदरी'),
 Q(3,'🏹','Who hit the eye of the wooden bird by focusing only on it?','Arjuna|Duryodhana|Karna','सिर्फ़ चिड़िया की आँख पर ध्यान लगाकर निशाना किसने लगाया?','अर्जुन|दुर्योधन|कर्ण'),
 Q(3,'🏰','How many years did Rama live in the forest?','14|10|7','राम ने कितने साल वन में बिताए?','14|10|7'),
 Q(3,'🏚️','Which poor friend brought a bundle of poha for Krishna?','Sudama|Arjuna|Uddhava','कृष्ण के लिए पोहे की पोटली कौन ग़रीब मित्र लाया?','सुदामा|अर्जुन|उद्धव'),
 Q(3,'🕷️','Anansi the spider comes from the tales of which continent?','Africa|Europe|Antarctica','मकड़ा अनान्सी किस महाद्वीप की कहानियों से आता है?','अफ़्रीका|यूरोप|अंटार्कटिका'),
 Q(3,'👡','Whose sandals did Bharata place on the throne?','Rama’s|Lakshman’s|His own','भरत ने किसकी खड़ाऊँ सिंहासन पर रखी?','राम की|लक्ष्मण की|अपनी'),
 Q(3,'🚗','Who drove Arjuna’s chariot in the great war?','Krishna|Bhima|Hanuman','महाभारत के युद्ध में अर्जुन का रथ किसने चलाया?','कृष्ण ने|भीम ने|हनुमान ने'),
 Q(4,'📜','Who is said to have written the Ramayana?','Valmiki|Vyasa|Kalidasa','रामायण किसने लिखी मानी जाती है?','वाल्मीकि|व्यास|कालिदास'),
 Q(4,'📚','Who is said to have composed the Mahabharata?','Vyasa|Valmiki|Panini','महाभारत की रचना किसने की मानी जाती है?','व्यास|वाल्मीकि|पाणिनि'),
 Q(4,'🐒','Which monkey king became Rama’s friend and ally?','Sugriva|Ravana|Vibhishana','कौन-सा वानर राजा राम का मित्र और सहयोगी बना?','सुग्रीव|रावण|विभीषण'),
 Q(4,'🌉','In the Jataka tale, what did the Monkey King make with his own body?','A bridge|A boat|A house','जातक कथा में वानरराज ने अपने शरीर से क्या बनाया?','पुल|नाव|घर')
]});

CX.FACTS = [
 {e:'🍯', en:'Honey can stay fresh for thousands of years.', hi:'शहद हज़ारों साल तक ख़राब नहीं होता।'},
 {e:'🐙', en:'An octopus has three hearts.', hi:'ऑक्टोपस के तीन दिल होते हैं।'},
 {e:'🌈', en:'A rainbow has seven colours.', hi:'इंद्रधनुष में सात रंग होते हैं।'},
 {e:'🦒', en:'Giraffes are the tallest animals on Earth.', hi:'जिराफ़ धरती के सबसे ऊँचे जानवर हैं।'},
 {e:'🐘', en:'Elephants are the biggest land animals.', hi:'हाथी ज़मीन के सबसे बड़े जानवर हैं।'},
 {e:'🦋', en:'Butterflies taste with their feet.', hi:'तितलियाँ अपने पैरों से स्वाद चखती हैं।'},
 {e:'🌍', en:'Water covers most of our Earth.', hi:'हमारी पृथ्वी के ज़्यादातर हिस्से में पानी है।'},
 {e:'⭐', en:'The Sun is a star. It only looks big because it is close.', hi:'सूरज एक तारा है। वह पास होने के कारण बड़ा दिखता है।'},
 {e:'🌙', en:'The Moon goes around the Earth about once a month.', hi:'चाँद लगभग एक महीने में पृथ्वी का एक चक्कर लगाता है।'},
 {e:'🐜', en:'Ants can carry things much heavier than themselves.', hi:'चींटियाँ अपने से कहीं ज़्यादा भारी चीज़ें उठा लेती हैं।'},
 {e:'🦚', en:'The peacock is India’s national bird.', hi:'मोर भारत का राष्ट्रीय पक्षी है।'},
 {e:'🐅', en:'The tiger is India’s national animal.', hi:'बाघ भारत का राष्ट्रीय पशु है।'},
 {e:'🐬', en:'Dolphins sleep with half of their brain awake.', hi:'डॉल्फ़िन सोते समय अपने आधे दिमाग़ को जागता रखती हैं।'},
 {e:'💧', en:'Your body needs water to stay healthy. Drink some today!', hi:'सेहतमंद रहने के लिए शरीर को पानी चाहिए। आज पानी पीना न भूलो!'},
 {e:'🕌', en:'The Taj Mahal is in Agra, India.', hi:'ताजमहल भारत के आगरा शहर में है।'},
 {e:'🌻', en:'Young sunflowers turn to face the Sun.', hi:'छोटे सूरजमुखी के फूल सूरज की ओर मुड़ जाते हैं।'}
];

/* odd-one-out groups: three from one group, one from another */
CX.ODD = [
 {k:'animal', en:'animal', hi:'जानवर', i:['🐶','🐱','🐮','🐴','🐵','🐘','🦁','🐰']},
 {k:'fruit', en:'fruit', hi:'फल', i:['🍎','🍌','🍇','🍊','🍓','🍉','🍍','🥭']},
 {k:'veg', en:'vegetable', hi:'सब्ज़ी', i:['🥕','🌽','🥔','🍅','🥦','🍆','🧅']},
 {k:'vehicle', en:'vehicle', hi:'सवारी', i:['🚗','🚌','🚲','🚂','✈️','🚢','🚁','🛵']},
 {k:'bird', en:'bird', hi:'पक्षी', i:['🐦','🦆','🦉','🦜','🦚','🐓','🦅']},
 {k:'sea', en:'sea animal', hi:'समुद्री जीव', i:['🐟','🐙','🐳','🦀','🐬','🦈','🐠']},
 {k:'wear', en:'clothes', hi:'कपड़े', i:['👕','👖','🧦','🧢','👗','🧥','👟']},
 {k:'sport', en:'sports thing', hi:'खेल की चीज़', i:['⚽','🏏','🏀','🎾','🏐','🏸']},
 {k:'music', en:'musical thing', hi:'संगीत की चीज़', i:['🥁','🎹','🎸','🎺','🎻','🎷']},
 {k:'sky', en:'sky thing', hi:'आसमान की चीज़', i:['☀️','🌙','⭐','☁️','🌈','⚡']}
];
/* mini sudoku (4 x 4) base solution */
CX.SUD = [[0,1,2,3],[2,3,0,1],[1,0,3,2],[3,2,1,0]];
CX.SYM = ['🍎','🐟','⭐','🌸','🐶','🚗'];
