"use strict";
/* Stories, in English and Hindi. pages: [picture, English text, Hindi text]; quiz: [question EN, "right|wrong|wrong" EN, question HI, "right|wrong|wrong" HI] */
const CS = {};
CS.STORIES = [
{e:'🌟',a:'3–6',title:{en:'Pip finds a friend',hi:'पिप को दोस्त मिला'},pages:[
 ['🌟🌙','Pip was a tiny star. Pip lived high up in the night sky.','पिप एक नन्हा-सा तारा था। वह रात के आसमान में ऊँचे रहता था।'],
 ['🌟😢','One night, Pip felt lonely. “I wish I had a friend,” said Pip.','एक रात पिप को अकेलापन लगा। “काश मेरा कोई दोस्त होता,” पिप ने कहा।'],
 ['🦉🌳','Hoo hoo! A little owl heard Pip. “I will be your friend,” said Owl.','हू-हू! एक छोटे उल्लू ने पिप की बात सुन ली। “मैं तुम्हारा दोस्त बनूँगा,” उल्लू ने कहा।'],
 ['☁️☁️☁️','Pip and Owl counted the clouds. One, two, three clouds!','पिप और उल्लू ने बादल गिने। एक, दो, तीन बादल!'],
 ['🌟🦉💛','Pip was not lonely now. Pip shone bright and happy.','अब पिप अकेला नहीं था। वह ख़ुशी से चमचम चमकने लगा।']],
 quiz:[['Who became Pip’s friend?','Owl|Fish|Bus','पिप का दोस्त कौन बना?','उल्लू|मछली|बस'],['How did Pip feel at first?','Lonely|Angry|Sleepy','शुरू में पिप को कैसा लगा?','अकेला|ग़ुस्सा|नींद वाला']]},
{e:'🐰',a:'3–6',title:{en:'Mimi and the rainy day',hi:'मिमी और बारिश का दिन'},pages:[
 ['🐰🏠','Mimi the bunny looked out of the window. It was a rainy day.','मिमी खरगोश ने खिड़की से बाहर देखा। बारिश हो रही थी।'],
 ['🌧️☔','Mimi put on her yellow boots and took her red umbrella.','मिमी ने पीले जूते पहने और लाल छतरी ली।'],
 ['🐸💦','Splash, splash, splash! Mimi jumped in the puddles with a little frog.','छप-छप-छप! मिमी ने एक छोटे मेंढक के साथ पानी में कूदकर खेला।'],
 ['🌈','Then the rain stopped. The sun came out, and a big rainbow filled the sky!','फिर बारिश रुक गई। धूप निकली और आसमान में बड़ा-सा इंद्रधनुष बन गया!'],
 ['🐰🐸😊','Mimi and Frog sat and smiled. “I love rainy days!” said Mimi.','मिमी और मेंढक बैठकर मुस्कुराए। “मुझे बारिश के दिन बहुत पसंद हैं!” मिमी ने कहा।']],
 quiz:[['What came out after the rain?','A rainbow|A snowman|A rocket','बारिश के बाद क्या निकला?','इंद्रधनुष|बर्फ़ का आदमी|रॉकेट'],['What colour were Mimi’s boots?','Yellow|Blue|Pink','मिमी के जूते किस रंग के थे?','पीले|नीले|गुलाबी']]},
{e:'🚌',a:'3–6',title:{en:'The big red bus',hi:'बड़ी लाल बस'},pages:[
 ['🚌🔴','The big red bus went down the road. Beep beep!','बड़ी लाल बस सड़क पर चली। पीं-पीं!'],
 ['🐮','Stop! One cow got on the bus. Moo!','बस रुकी। एक गाय बस में चढ़ी। म्ऊँ!'],
 ['🐑🐑','Stop! Two sheep got on the bus. Baa, baa!','बस रुकी। दो भेड़ें बस में चढ़ीं। में-में!'],
 ['🦆🦆🦆','Stop! Three ducks got on the bus. Quack, quack, quack!','बस रुकी। तीन बत्तख़ें बस में चढ़ीं। क्वैक-क्वैक-क्वैक!'],
 ['🚌🐮🐑🦆','Now the bus was full. Off they all went, singing a happy song!','अब बस भर गई थी। सब ख़ुशी-ख़ुशी गाना गाते हुए चल दिए!']],
 quiz:[['How many ducks got on the bus?','Three|One|Two','बस में कितनी बत्तख़ें चढ़ीं?','तीन|एक|दो'],['Which animal got on first?','Cow|Sheep|Duck','सबसे पहले कौन-सा जानवर चढ़ा?','गाय|भेड़|बत्तख़']]},
{e:'🐦',a:'5–8',title:{en:'The thirsty crow',hi:'प्यासा कौआ'},pages:[
 ['☀️🐦','It was a hot, hot day. A thirsty crow flew here and there looking for water.','बहुत गरमी का दिन था। एक प्यासा कौआ पानी की तलाश में इधर-उधर उड़ता रहा।'],
 ['🏺💧','At last the crow saw a pot. There was a little water at the bottom, but the crow’s beak could not reach it.','आख़िर उसे एक घड़ा दिखा। घड़े में नीचे थोड़ा-सा पानी था, पर कौए की चोंच वहाँ तक नहीं पहुँच रही थी।'],
 ['🪨🐦','The crow thought and thought. Then it had an idea! It dropped small stones into the pot, one by one.','कौए ने सोचा, और सोचा। फिर उसे एक तरकीब सूझी! वह छोटे-छोटे कंकड़ एक-एक करके घड़े में डालने लगा।'],
 ['🏺⬆️','Plop, plop, plop! The water came up higher and higher.','टप-टप-टप! पानी ऊपर आता गया, और ऊपर, और ऊपर।'],
 ['🐦💧😊','Now the crow could drink. Caw, caw! A clever idea can solve a hard problem.','अब कौआ पानी पी सका। काँव-काँव! अच्छी तरकीब से मुश्किल काम भी आसान हो जाता है।']],
 quiz:[['What did the crow drop into the pot?','Small stones|Sand|Leaves','कौए ने घड़े में क्या डाला?','छोटे कंकड़|रेत|पत्ते'],['What does this story teach us?','Think of clever ideas|Give up|Be lazy','यह कहानी हमें क्या सिखाती है?','अच्छी तरकीब सोचो|हार मान लो|आलसी बनो']]},
{e:'🐢',a:'5–8',title:{en:'The hare and the tortoise',hi:'ख़रगोश और कछुआ'},pages:[
 ['🐇😏','A proud hare laughed at a slow tortoise. “I can run much faster than you!” said the hare.','एक घमंडी ख़रगोश एक धीमे कछुए पर हँसा। “मैं तुमसे बहुत तेज़ दौड़ सकता हूँ!” ख़रगोश ने कहा।'],
 ['🐢🏁','“Let us have a race,” said the tortoise. All the animals came to watch.','“चलो, दौड़ लगाते हैं,” कछुए ने कहा। सारे जानवर देखने आ गए।'],
 ['🐇💤🌳','The hare zoomed far ahead. “I have time to sleep,” he said, and lay down under a tree.','ख़रगोश बहुत आगे निकल गया। “मेरे पास तो सोने का भी समय है,” उसने कहा और एक पेड़ के नीचे लेट गया।'],
 ['🐢👣','The tortoise kept walking, slowly and steadily. He did not stop.','कछुआ धीरे-धीरे लगातार चलता रहा। वह रुका नहीं।'],
 ['🐢🏆','When the hare woke up, the tortoise was at the finish line. Slow and steady wins the race!','जब ख़रगोश जागा, तो कछुआ जीत की रेखा पर पहुँच चुका था। धीरे पर लगातार चलने वाला जीतता है!']],
 quiz:[['Who won the race?','The tortoise|The hare|The fox','दौड़ कौन जीता?','कछुआ|ख़रगोश|लोमड़ी'],['Why did the hare lose?','He fell asleep|He was slow|He got lost','ख़रगोश क्यों हारा?','वह सो गया|वह धीमा था|वह रास्ता भूल गया']]},
{e:'🦁',a:'5–8',title:{en:'The lion and the mouse',hi:'शेर और चूहा'},pages:[
 ['🦁💤🐭','A little mouse ran over a sleeping lion’s nose. The lion woke up and caught the mouse.','एक नन्हा चूहा सोते हुए शेर की नाक पर से दौड़ गया। शेर जाग गया और उसने चूहे को पकड़ लिया।'],
 ['🐭🙏','“Please let me go,” said the mouse. “One day I will help you.” The lion laughed, but he let the mouse go.','“मुझे जाने दो,” चूहे ने कहा। “एक दिन मैं तुम्हारी मदद करूँगा।” शेर हँसा, पर उसने चूहे को छोड़ दिया।'],
 ['🦁🕸️','Some days later, hunters caught the lion in a strong net. He roared and roared, but he could not get out.','कुछ दिन बाद शिकारियों ने शेर को मज़बूत जाल में फँसा लिया। वह बहुत दहाड़ा, पर निकल नहीं पाया।'],
 ['🐭✂️','The little mouse heard him and came running. Nibble, nibble! She cut the ropes with her sharp teeth.','नन्हे चूहे ने उसकी आवाज़ सुनी और दौड़ता हुआ आया। कुतर-कुतर! उसने अपने तेज़ दाँतों से रस्सियाँ काट दीं।'],
 ['🦁🐭💛','The lion was free! “Thank you, little friend,” he said. Even small friends can help in big ways.','शेर आज़ाद हो गया! “धन्यवाद, छोटे दोस्त,” उसने कहा। छोटे दोस्त भी बड़ी मदद कर सकते हैं।']],
 quiz:[['How did the mouse help the lion?','She cut the net|She sang a song|She gave him food','चूहे ने शेर की मदद कैसे की?','उसने जाल काट दिया|उसने गाना गाया|उसने खाना दिया'],['What does this story teach us?','Small friends can help too|Only big ones can help|Never say sorry','यह कहानी हमें क्या सिखाती है?','छोटे दोस्त भी मदद कर सकते हैं|सिर्फ़ बड़े मदद कर सकते हैं|कभी माफ़ी मत माँगो']]},
{e:'🎒',a:'5–8',title:{en:'Aarav’s first day at school',hi:'आरव का स्कूल में पहला दिन'},pages:[
 ['🎒😟','Aarav felt a little nervous. Today was his first day at school.','आरव थोड़ा घबराया हुआ था। आज उसका स्कूल का पहला दिन था।'],
 ['👩‍🏫☀️','His teacher smiled and said, “Good morning, Aarav!” Aarav said, “Good morning, ma’am.”','टीचर ने मुस्कुराकर कहा, “गुड मॉर्निंग, आरव!” आरव ने कहा, “गुड मॉर्निंग, मैम।”'],
 ['👧🖍️','A girl named Meera shared her crayons with him. “Thank you!” said Aarav.','मीरा नाम की लड़की ने अपनी रंगीन पेंसिलें आरव के साथ बाँटीं। “धन्यवाद!” आरव ने कहा।'],
 ['🎶☀️','They sang, played, and drew a big yellow sun together.','उन्होंने साथ मिलकर गाना गाया, खेले और एक बड़ा पीला सूरज बनाया।'],
 ['👦👩😊','When Mummy came, Aarav said, “School is fun! I made a new friend.”','जब मम्मी आईं, तो आरव ने कहा, “स्कूल में बहुत मज़ा आया! मुझे एक नया दोस्त मिला।”']],
 quiz:[['Who shared her crayons with Aarav?','Meera|Mummy|The teacher','आरव को अपनी रंगीन पेंसिलें किसने दीं?','मीरा ने|मम्मी ने|टीचर ने'],['How did Aarav feel at the end of the day?','Happy|Scared|Angry','दिन के आख़िर में आरव को कैसा लगा?','ख़ुश|डरा हुआ|ग़ुस्सा']]},
{e:'🌱',a:'5–8',title:{en:'Ria’s little seed',hi:'रिया का नन्हा बीज'},pages:[
 ['👧🌱','Ria planted a tiny seed in a pot of soil.','रिया ने मिट्टी के गमले में एक नन्हा-सा बीज बोया।'],
 ['💧🪟','Every day she gave it water and kept it near the window, where the sun could reach it.','हर दिन वह उसमें पानी डालती और उसे खिड़की के पास रखती, जहाँ धूप आती थी।'],
 ['🌱✨','One morning, a small green shoot popped out of the soil!','एक सुबह मिट्टी से एक छोटा हरा अंकुर निकल आया!'],
 ['🌿🌿','Days passed. The shoot grew taller and grew green leaves.','कई दिन बीत गए। अंकुर लंबा होता गया और उस पर हरी पत्तियाँ आ गईं।'],
 ['🌻😊','Soon a bright yellow flower bloomed. “Seeds need soil, water and sunlight,” said Ria.','जल्दी ही एक चमकीला पीला फूल खिल गया। “बीज को मिट्टी, पानी और धूप चाहिए,” रिया ने कहा।']],
 quiz:[['What does a seed need to grow?','Soil, water and sunlight|Toys and candy|Plastic and sand','बीज को उगने के लिए क्या चाहिए?','मिट्टी, पानी और धूप|खिलौने और टॉफ़ी|प्लास्टिक और रेत'],['What came out of the soil first?','A green shoot|A flower|A fruit','मिट्टी से सबसे पहले क्या निकला?','हरा अंकुर|फूल|फल']]},
{e:'🐜',a:'7–10',title:{en:'The ant and the grasshopper',hi:'चींटी और टिड्डा'},pages:[
 ['🐜🌾','All summer long, a little ant worked hard. She carried grains of wheat to her home.','पूरी गरमी भर एक छोटी चींटी मेहनत करती रही। वह गेहूँ के दाने अपने घर ले जाती रही।'],
 ['🦗🎶','A grasshopper sat nearby, singing and dancing. “Why work so hard? Come and play!” he said.','पास में एक टिड्डा बैठा गाना गाता और नाचता रहा। “इतनी मेहनत क्यों करती हो? आओ खेलो!” उसने कहा।'],
 ['🐜📦','“I am storing food for winter,” said the ant. The grasshopper laughed and went on playing.','“मैं सर्दियों के लिए खाना जमा कर रही हूँ,” चींटी ने कहा। टिड्डा हँसा और खेलता रहा।'],
 ['❄️🦗😟','Winter came. It was cold and snowy. The grasshopper had no food and no home.','सर्दी आ गई। बहुत ठंड थी और बर्फ़ गिर रही थी। टिड्डे के पास न खाना था, न घर।'],
 ['🐜🦗🤝','The kind ant shared some food with him. “Next summer I will work too,” promised the grasshopper. Plan ahead and work hard.','दयालु चींटी ने उसे थोड़ा खाना दिया। “अगली गरमी में मैं भी काम करूँगा,” टिड्डे ने वादा किया। पहले से तैयारी करो और मेहनत करो।']],
 quiz:[['Why was the ant collecting food?','For the winter|For a party|For a game','चींटी खाना क्यों जमा कर रही थी?','सर्दियों के लिए|दावत के लिए|खेल के लिए'],['What did the grasshopper promise?','To work next summer|To sing more|To sleep more','टिड्डे ने क्या वादा किया?','अगली गरमी में काम करने का|और गाने का|और सोने का']]},
{e:'🐒',a:'7–10',title:{en:'The monkey and the crocodile',hi:'बंदर और मगरमच्छ'},pages:[
 ['🐒🌳','A monkey lived on a jamun tree by the river. He shared sweet jamuns with his friend, a crocodile.','एक बंदर नदी किनारे जामुन के पेड़ पर रहता था। वह अपने दोस्त मगरमच्छ को मीठे जामुन खिलाता था।'],
 ['🐊😠','The crocodile’s wife was greedy. “Bring that monkey to me,” she said. So the crocodile invited the monkey for a ride on his back.','मगरमच्छ की पत्नी लालची थी। “उस बंदर को मेरे पास लाओ,” उसने कहा। इसलिए मगरमच्छ ने बंदर को अपनी पीठ पर सैर के लिए बुलाया।'],
 ['🌊🐒💭','In the middle of the river, the crocodile told the truth. The clever monkey thought fast.','नदी के बीच में मगरमच्छ ने सच बता दिया। चतुर बंदर ने जल्दी से सोचा।'],
 ['🐒💬','“Oh dear!” said the monkey. “I left my heart on the tree. Take me back to get it.” The foolish crocodile swam back.','“अरे नहीं!” बंदर बोला। “मैं तो अपना दिल पेड़ पर ही छोड़ आया। मुझे वापस ले चलो।” बेवक़ूफ़ मगरमच्छ वापस तैर आया।'],
 ['🐒🌳😄','The monkey jumped up the tree. “Silly crocodile! Nobody keeps their heart on a tree!” Stay calm and think cleverly when you are in trouble.','बंदर उछलकर पेड़ पर चढ़ गया। “बुद्धू मगरमच्छ! दिल भी कोई पेड़ पर रखता है क्या?” मुसीबत में शांत रहो और सूझबूझ से काम लो।']],
 quiz:[['Where did the monkey live?','On a jamun tree|In a cave|In a boat','बंदर कहाँ रहता था?','जामुन के पेड़ पर|गुफा में|नाव में'],['How did the monkey save himself?','By thinking cleverly|By fighting|By crying','बंदर ने ख़ुद को कैसे बचाया?','चतुराई से सोचकर|लड़कर|रोकर']]},
{e:'🐱',a:'7–10',title:{en:'Rohan and the lost kitten',hi:'रोहन और खोया हुआ बिल्ली का बच्चा'},pages:[
 ['👦🎒🐱','Rohan was walking home from school when he heard a soft “meow”.','रोहन स्कूल से घर लौट रहा था तभी उसे धीमी-सी “म्याऊँ” सुनाई दी।'],
 ['🐱🌿','Under a bush sat a tiny, shivering kitten. It looked lost and hungry.','झाड़ी के नीचे एक नन्हा बिल्ली का बच्चा काँप रहा था। वह खोया हुआ और भूखा लग रहा था।'],
 ['🥛🐱','Rohan gave it some of his milk and carried it home carefully.','रोहन ने उसे अपने दूध में से थोड़ा दूध पिलाया और सँभालकर घर ले आया।'],
 ['👩👧🐱','Mummy helped him find the kitten’s owner, a girl in the next lane. She was so happy to see her kitten again.','मम्मी ने उसे बच्चे के मालिक को ढूँढ़ने में मदद की। वह अगली गली की एक लड़की थी। अपने बिल्ली के बच्चे को देखकर वह बहुत ख़ुश हुई।'],
 ['👧👦💛','“Thank you, Rohan!” she said. Rohan felt warm and proud. Being kind makes everyone happy.','“धन्यवाद, रोहन!” उसने कहा। रोहन को बहुत अच्छा और गर्व महसूस हुआ। दयालु बनने से सब ख़ुश होते हैं।']],
 quiz:[['What did Rohan hear on the way home?','A soft meow|A loud bell|A song','घर लौटते समय रोहन ने क्या सुना?','धीमी म्याऊँ|तेज़ घंटी|गाना'],['What did Rohan do for the kitten?','Helped it|Ignored it|Ran away','रोहन ने बिल्ली के बच्चे के लिए क्या किया?','उसकी मदद की|अनदेखा किया|भाग गया']]},
{e:'🪓',a:'7–10',title:{en:'The honest woodcutter',hi:'ईमानदार लकड़हारा'},pages:[
 ['🪓🌊','A poor woodcutter was cutting wood by a river. His iron axe slipped and fell into the deep water.','एक ग़रीब लकड़हारा नदी किनारे लकड़ी काट रहा था। उसकी लोहे की कुल्हाड़ी फिसलकर गहरे पानी में गिर गई।'],
 ['😢🧚','He sat down and cried. A kind river fairy appeared. “Why are you crying?” she asked.','वह बैठकर रोने लगा। तभी एक दयालु जल-परी प्रकट हुई। “तुम क्यों रो रहे हो?” उसने पूछा।'],
 ['🥇🥈','She dived in and brought a golden axe. “Is this yours?” “No,” said the woodcutter. She brought a silver axe. “No,” he said again.','परी ने डुबकी लगाई और सोने की कुल्हाड़ी लेकर आई। “क्या यह तुम्हारी है?” “नहीं,” लकड़हारा बोला। फिर वह चाँदी की कुल्हाड़ी लाई। “नहीं,” उसने फिर कहा।'],
 ['🪓😊','At last she brought his old iron axe. “Yes! This one is mine,” he smiled.','आख़िर में वह उसकी पुरानी लोहे की कुल्हाड़ी लाई। “हाँ! यह मेरी है,” वह मुस्कुराया।'],
 ['🧚🎁','The fairy was pleased with his honesty and gave him all three axes. Honesty is the best policy.','परी उसकी ईमानदारी से बहुत ख़ुश हुई और उसने उसे तीनों कुल्हाड़ियाँ दे दीं। ईमानदारी सबसे अच्छी नीति है।']],
 quiz:[['What fell into the river?','An iron axe|A hat|A book','नदी में क्या गिर गया?','लोहे की कुल्हाड़ी|टोपी|किताब'],['Why did the fairy give him all three axes?','Because he was honest|Because he was strong|Because he was rich','परी ने उसे तीनों कुल्हाड़ियाँ क्यों दीं?','क्योंकि वह ईमानदार था|क्योंकि वह ताक़तवर था|क्योंकि वह अमीर था']]},
{e:'🌙',a:'3–6',title:{en:'Chanda the little moon',hi:'नन्हा चाँद'},pages:[
 ['🌙😊','Little Moon lived in the sky. At night, she lit up the whole village.','नन्हा चाँद आसमान में रहता था। रात को वह पूरे गाँव को रोशन करता था।'],
 ['👧🌙','A little girl looked up. “Moon, why do you change shape?” she asked.','एक छोटी बच्ची ने ऊपर देखा। “चाँद, तुम अपना आकार क्यों बदलते हो?” उसने पूछा।'],
 ['🌑🌓🌕','“I like to play!” said Moon. “Sometimes I am thin like a smile. Sometimes I am round like a ball.”','“मुझे खेलना पसंद है!” चाँद ने कहा। “कभी मैं मुस्कान जैसा पतला होता हूँ। कभी गेंद जैसा गोल।”'],
 ['⭐⭐⭐','“And the stars are my friends,” said Moon. “We shine together.”','“और तारे मेरे दोस्त हैं,” चाँद ने कहा। “हम साथ-साथ चमकते हैं।”'],
 ['👧💤🌙','The girl smiled and went to sleep. “Good night, Moon!” Moon kept shining softly.','बच्ची मुस्कुराई और सो गई। “शुभ रात्रि, चाँद!” चाँद धीरे-धीरे चमकता रहा।']],
 quiz:[['Who are the Moon’s friends?','The stars|The buses|The cows','चाँद के दोस्त कौन हैं?','तारे|बसें|गायें'],['What does the girl say at the end?','Good night, Moon|Good morning, Sun|Happy birthday','अंत में बच्ची क्या कहती है?','शुभ रात्रि, चाँद|सुप्रभात, सूरज|जन्मदिन मुबारक']]}
];
