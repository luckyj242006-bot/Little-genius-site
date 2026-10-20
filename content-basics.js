"use strict";
/* Little Genius content: letters, picture words, language-learning data.
   Everything the child sees exists in English (en) and Hindi (hi). */
const CB = {};

/* ----- English alphabet ----- */
CB.LET = [['A','apple','🍎'],['B','ball','⚽'],['C','cat','🐱'],['D','dog','🐶'],['E','egg','🥚'],['F','fish','🐟'],['G','grapes','🍇'],['H','hat','🎩'],['I','ice cream','🍦'],['J','juice','🧃'],['K','key','🔑'],['L','lion','🦁'],['M','moon','🌙'],['N','nose','👃'],['O','orange','🍊'],['P','pizza','🍕'],['Q','queen','👑'],['R','rainbow','🌈'],['S','sun','☀️'],['T','tree','🌳'],['U','umbrella','☂️'],['V','violin','🎻'],['W','whale','🐳'],['X','box','📦'],['Y','yarn','🧶'],['Z','zebra','🦓']];

/* ----- Hindi varnamala ----- */
CB.SWAR = [['अ','अजगर','🐍'],['आ','आम','🥭'],['इ','इमारत','🏢'],['ई','ईंट','🧱'],['उ','उल्लू','🦉'],['ऊ','ऊँट','🐪'],['ऋ','ऋषि','🧘'],['ए','एक','1️⃣'],['ऐ','ऐनक','👓'],['ओ','ओस','💧'],['औ','औरत','👩'],['अं','अंगूर','🍇']];
CB.VYAN = [['क','कमल','🪷'],['ख','खरगोश','🐇'],['ग','गाय','🐮'],['घ','घर','🏠'],['च','चम्मच','🥄'],['छ','छाता','☂️'],['ज','जहाज़','🚢'],['झ','झंडा','🚩'],['ट','टमाटर','🍅'],['ठ','ठंड','🥶'],['ड','डिब्बा','📦'],['ढ','ढोल','🥁'],['त','तरबूज़','🍉'],['थ','थाली','🍽️'],['द','दीया','🪔'],['ध','धनुष','🏹'],['न','नल','🚰'],['प','पतंग','🪁'],['फ','फूल','🌸'],['ब','बतख','🦆'],['भ','भालू','🐻'],['म','मछली','🐟'],['य','यंत्र','⚙️'],['र','रेल','🚂'],['ल','लड़की','👧'],['व','वन','🌲'],['श','शेर','🦁'],['ष','षट्कोण','⬡'],['स','सेब','🍎'],['ह','हाथी','🐘'],['क्ष','क्षमा','🙏'],['त्र','त्रिशूल','🔱'],['ज्ञ','ज्ञान','📚']];

/* ----- Number names ----- */
CB.NUM_EN = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
CB.NUM_HI = ['शून्य','एक','दो','तीन','चार','पाँच','छह','सात','आठ','नौ','दस','ग्यारह','बारह','तेरह','चौदह','पंद्रह','सोलह','सत्रह','अठारह','उन्नीस','बीस'];

/* ----- Picture words: [category, emoji, English, Hindi, Hindi in English letters, level] ----- */
const V = (c,e,en,hi,ro,l) => ({c,e,en,hi,ro,l});
CB.VOCAB = [
 V('animals','🐱','cat','बिल्ली','billi',1),V('animals','🐶','dog','कुत्ता','kutta',1),V('animals','🐮','cow','गाय','gaay',1),
 V('animals','🐘','elephant','हाथी','haathi',1),V('animals','🦁','lion','शेर','sher',1),V('animals','🐒','monkey','बंदर','bandar',1),
 V('animals','🐴','horse','घोड़ा','ghoda',1),V('animals','🐟','fish','मछली','machhli',1),V('animals','🐦','bird','चिड़िया','chidiya',1),
 V('animals','🐯','tiger','बाघ','baagh',2),V('animals','🐸','frog','मेंढक','mendhak',2),V('animals','🐢','turtle','कछुआ','kachhua',2),
 V('animals','🐑','sheep','भेड़','bhed',2),V('animals','🐐','goat','बकरी','bakri',2),V('animals','🐷','pig','सूअर','sooar',2),
 V('animals','🦆','duck','बत्तख','battakh',2),V('animals','🐍','snake','साँप','saanp',2),V('animals','🐭','mouse','चूहा','chuha',2),
 V('animals','🐇','rabbit','खरगोश','khargosh',2),V('animals','🐪','camel','ऊँट','oont',2),V('animals','🦋','butterfly','तितली','titli',2),
 V('animals','🐝','bee','मधुमक्खी','madhumakkhi',2),V('animals','🐻','bear','भालू','bhaalu',2),V('animals','🦜','parrot','तोता','tota',2),
 V('animals','🦚','peacock','मोर','mor',2),V('animals','🐜','ant','चींटी','cheenti',2),V('animals','🐔','hen','मुर्गी','murgi',2),
 V('animals','🐊','crocodile','मगरमच्छ','magarmachh',3),V('animals','🦓','zebra','ज़ेबरा','zebra',3),V('animals','🦒','giraffe','जिराफ़','giraffe',3),
 V('food','🍎','apple','सेब','seb',1),V('food','🍌','banana','केला','kela',1),V('food','🥭','mango','आम','aam',1),
 V('food','🥕','carrot','गाजर','gaajar',1),V('food','🍅','tomato','टमाटर','tamatar',1),V('food','🥔','potato','आलू','aaloo',1),
 V('food','🥛','milk','दूध','doodh',1),V('food','🍞','bread','ब्रेड','bread',1),V('food','🫓','roti','रोटी','roti',1),
 V('food','🍚','rice','चावल','chaawal',1),V('food','🍰','cake','केक','cake',1),V('food','🍇','grapes','अंगूर','angoor',2),
 V('food','🍊','orange','संतरा','santara',2),V('food','🍋','lemon','नींबू','neembu',2),V('food','🥥','coconut','नारियल','nariyal',2),
 V('food','🧅','onion','प्याज़','pyaaz',2),V('food','🌽','corn','भुट्टा','bhutta',2),V('food','🍉','watermelon','तरबूज़','tarbooz',3),
 V('food','🍍','pineapple','अनानास','ananaas',3),V('food','🍐','pear','नाशपाती','nashpati',3),V('food','🍆','brinjal','बैंगन','baingan',3),
 V('body','👁️','eye','आँख','aankh',1),V('body','👂','ear','कान','kaan',1),V('body','👃','nose','नाक','naak',1),
 V('body','👄','mouth','मुँह','munh',1),V('body','✋','hand','हाथ','haath',1),V('body','🦶','foot','पैर','pair',1),V('body','🦷','tooth','दाँत','daant',2),
 V('home','🏠','house','घर','ghar',1),V('home','🪑','chair','कुर्सी','kursi',1),V('home','📖','book','किताब','kitaab',1),
 V('home','✏️','pencil','पेंसिल','pencil',1),V('home','🕒','clock','घड़ी','ghadi',1),V('home','🎩','hat','टोपी','topi',1),
 V('home','👟','shoe','जूता','joota',1),V('home','🪁','kite','पतंग','patang',1),V('home','⚽','ball','गेंद','gend',1),
 V('home','🛏️','bed','पलंग','palang',2),V('home','🔑','key','चाबी','chaabi',2),V('home','☂️','umbrella','छाता','chhaata',2),
 V('home','🍽️','plate','थाली','thaali',2),V('home','🔔','bell','घंटी','ghanti',2),V('home','🪔','lamp','दीया','diya',2),
 V('home','🎒','bag','बस्ता','basta',2),V('home','🧺','basket','टोकरी','tokri',3),V('home','🚪','door','दरवाज़ा','darwaaza',3),
 V('nature','☀️','sun','सूरज','sooraj',1),V('nature','🌙','moon','चाँद','chaand',1),V('nature','⭐','star','तारा','taara',1),
 V('nature','🌳','tree','पेड़','ped',1),V('nature','🌸','flower','फूल','phool',1),V('nature','💧','water','पानी','paani',1),
 V('nature','🔥','fire','आग','aag',2),V('nature','☁️','cloud','बादल','baadal',2),V('nature','🌧️','rain','बारिश','baarish',2),
 V('nature','⛰️','mountain','पहाड़','pahaad',2),V('nature','🏞️','river','नदी','nadi',2),V('nature','🌈','rainbow','इंद्रधनुष','indradhanush',3),
 V('go','🚌','bus','बस','bas',1),V('go','🚗','car','कार','kaar',1),V('go','🚲','cycle','साइकिल','cycle',1),
 V('go','🚂','train','रेलगाड़ी','relgaadi',2),V('go','🚢','ship','जहाज़','jahaaz',2),V('go','🛺','rickshaw','रिक्शा','rickshaw',2),
 V('go','✈️','aeroplane','हवाई जहाज़','havaai jahaaz',2),V('go','🚁','helicopter','हेलिकॉप्टर','helicopter',3),
 V('family','👩','mother','माँ','maa',1),V('family','👨','father','पापा','papa',1),V('family','👵','grandmother','दादी','daadi',1),
 V('family','👴','grandfather','दादा','daada',1),V('family','👧','girl','लड़की','ladki',1),V('family','👦','boy','लड़का','ladka',1),
 V('family','👶','baby','बच्चा','bachcha',1),V('family','🧑‍🏫','teacher','शिक्षक','shikshak',3)
];
CB.VCATS = [
 {id:'animals',e:'🐾',en:'Animals',hi:'जानवर'},{id:'food',e:'🍎',en:'Food',hi:'खाना-पीना'},{id:'body',e:'🧍',en:'Body',hi:'शरीर'},
 {id:'home',e:'🏠',en:'Home & school',hi:'घर और स्कूल'},{id:'nature',e:'🌳',en:'Nature',hi:'प्रकृति'},
 {id:'go',e:'🚌',en:'Vehicles',hi:'सवारियाँ'},{id:'family',e:'👪',en:'People',hi:'लोग'}
];

/* ----- Language practice data ----- */
// opposites [a, b]
CB.OPP = {
 en:[['hot','cold'],['big','small'],['up','down'],['day','night'],['happy','sad'],['fast','slow'],['open','close'],['in','out'],['old','new'],['long','short'],['full','empty'],['hard','soft'],['clean','dirty'],['near','far'],['heavy','light'],['early','late'],['strong','weak'],['wet','dry'],['good','bad'],['front','back'],['thick','thin'],['brave','scared'],['rich','poor']],
 hi:[['गरम','ठंडा'],['बड़ा','छोटा'],['ऊपर','नीचे'],['दिन','रात'],['ख़ुश','दुखी'],['तेज़','धीमा'],['अंदर','बाहर'],['पुराना','नया'],['भरा','खाली'],['सख़्त','नरम'],['साफ़','गंदा'],['पास','दूर'],['भारी','हल्का'],['जल्दी','देर'],['मज़बूत','कमज़ोर'],['गीला','सूखा'],['अच्छा','बुरा'],['आगे','पीछे'],['मोटा','पतला'],['बहादुर','डरपोक'],['अमीर','ग़रीब'],['सच','झूठ'],['सुबह','शाम']]
};
// rhyming groups
CB.RHYME = {
 en:[['cat','hat','bat','mat'],['dog','log','frog','fog'],['sun','run','fun','bun'],['bee','tree','key','knee'],['cake','lake','snake','bake'],['ball','wall','tall','fall'],['star','car','jar','far'],['bed','red','head','shed'],['pen','hen','ten','men'],['moon','spoon','balloon','noon'],['book','look','cook','hook'],['mouse','house','blouse','louse'],['night','light','kite','bright'],['rain','train','plane','chain']],
 hi:[['आम','नाम','काम','शाम'],['कल','जल','फल','पल'],['मोर','शोर','चोर','भोर'],['बात','रात','मात','सौगात'],['दिन','गिन','बिन','छिन'],['घड़ी','लड़ी','कड़ी','छड़ी'],['नाच','काँच','साँच','जाँच'],['मटर','बंदर','अंदर','समंदर'],['पानी','रानी','कहानी','नानी'],['बाल','गाल','लाल','चाल']]
};
// [singular, plural]
CB.PLURAL = {
 en:[['cat','cats'],['dog','dogs'],['book','books'],['box','boxes'],['bus','buses'],['watch','watches'],['baby','babies'],['city','cities'],['leaf','leaves'],['knife','knives'],['child','children'],['man','men'],['woman','women'],['mouse','mice'],['foot','feet'],['tooth','teeth']],
 hi:[['लड़का','लड़के'],['कुत्ता','कुत्ते'],['घोड़ा','घोड़े'],['किताब','किताबें'],['लड़की','लड़कियाँ'],['चिड़िया','चिड़ियाँ'],['माला','मालाएँ'],['कहानी','कहानियाँ'],['बच्चा','बच्चे'],['तोता','तोते'],['गुड़िया','गुड़ियाँ'],['रात','रातें']]
};
// [male, female]
CB.GENDER = {
 en:[['boy','girl'],['king','queen'],['uncle','aunt'],['brother','sister'],['father','mother'],['grandfather','grandmother'],['lion','lioness'],['actor','actress'],['son','daughter'],['prince','princess']],
 hi:[['लड़का','लड़की'],['राजा','रानी'],['शेर','शेरनी'],['बेटा','बेटी'],['दादा','दादी'],['नर','नारी'],['मोर','मोरनी'],['नाना','नानी'],['चाचा','चाची'],['माली','मालिन'],['बंदर','बंदरिया'],['हाथी','हथिनी']]
};
// a / an practice
CB.ARTICLE = [['apple','an'],['dog','a'],['egg','an'],['cat','a'],['umbrella','an'],['ball','a'],['orange','an'],['book','a'],['elephant','an'],['kite','a'],['ice cream','an'],['sun','a'],['owl','an'],['pencil','a'],['ant','an'],['hour','an'],['unicorn','a'],['onion','an']];

/* Split a Hindi word into aksharas so it can be built from tiles */
CB.splitHindi = function(w){
  const re = /(?:[क-हक़-य़]़?्)*[क-हक़-य़]़?[ा-ौेैॢॣँंः]*|[अ-औ][ँंः]?/g;
  return w.match(re) || [];
};
