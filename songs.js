// Starter library: public-domain hymns only (modern worship songs are copyrighted — add those yourself).
// Chords are written as numbers in the song's key; edit any of them in the app.
const STARTER_SONGS = [
  {
    id: 'pd-amazing-grace', title: 'Amazing Grace', artist: 'John Newton (1779)', key: 'G', tempo: 72, time: '3/4', updated: 0,
    info: 'Tune: NEW BRITAIN. Last verse (“When we’ve been there…”) is traditional, added later.',
    chart: `Verse 1
A[1]mazing [1/3]grace, how [4]sweet the [1]sound
That [1]saved a wretch like [5]me
I [1]once was [1/3]lost, but [4]now am [1]found
Was [6m]blind, but [5]now I [1]see

Verse 2
'Twas [1]grace that [1/3]taught my [4]heart to [1]fear
And [1]grace my fears re[5]lieved
How [1]precious [1/3]did that [4]grace ap[1]pear
The [6m]hour I [5]first be[1]lieved

Verse 3
Through [1]many [1/3]dangers, [4]toils and [1]snares
I [1]have already [5]come
'Tis [1]grace hath [1/3]brought me [4]safe thus [1]far
And [6m]grace will [5]lead me [1]home

Verse 4
The [1]Lord has [1/3]promised [4]good to [1]me
His [1]word my hope se[5]cures
He [1]will my [1/3]shield and [4]portion [1]be
As [6m]long as [5]life en[1]dures

Verse 5
When [1]we've been [1/3]there ten [4]thousand [1]years
Bright [1]shining as the [5]sun
We've [1]no less [1/3]days to [4]sing God's [1]praise
Than [6m]when we'd [5]first be[1]gun`,
  },
  {
    id: 'pd-blessed-assurance', title: 'Blessed Assurance', artist: 'Fanny Crosby (1873)', key: 'D', tempo: 60, time: '9/8', updated: 0,
    info: 'Tune: ASSURANCE by Phoebe Knapp. Gentle, rolling 3-feel.',
    chart: `Verse 1
[1]Blessed assurance, [4]Jesus is [1]mine
O what a foretaste of [5]glory divine
[1]Heir of salvation, [4]purchase of [1]God
[4]Born of His [1]Spirit, [5]washed in His [1]blood

Chorus
[1]This is my story, [4]this is my [1]song
Praising my Savior [5]all the day long
[1]This is my story, [4]this is my [1]song
[4]Praising my [1]Savior [5]all the day [1]long

Verse 2
[1]Perfect submission, [4]perfect de[1]light
Visions of rapture now [5]burst on my sight
[1]Angels descending [4]bring from a[1]bove
[4]Echoes of [1]mercy, [5]whispers of [1]love

Verse 3
[1]Perfect submission, [4]all is at [1]rest
I in my Savior am [5]happy and blest
[1]Watching and waiting, [4]looking a[1]bove
[4]Filled with His [1]goodness, [5]lost in His [1]love`,
  },
  {
    id: 'pd-it-is-well', title: 'It Is Well with My Soul', artist: 'Horatio Spafford (1873)', key: 'C', tempo: 66, time: '4/4', updated: 0,
    info: 'Tune: VILLE DU HAVRE by Philip Bliss. Chorus has an echo part in brackets.',
    chart: `Verse 1
When [1]peace like a [6m]river at[4]tendeth my [1]way
When [1]sorrows like [6m]sea billows [2]roll [5]
What[1]ever my [4]lot, Thou hast [1]taught me to [6m]say
It is [1/5]well, it is [5]well with my [1]soul

Chorus
It is [5]well (it is well)
With my [1]soul (with my soul)
It is [4]well, it is [1/5]well [5]with my [1]soul

Verse 2
Though [1]Satan should [6m]buffet, though [4]trials should [1]come
Let [1]this blest as[6m]surance con[2]trol [5]
That [1]Christ hath re[4]garded my [1]helpless es[6m]tate
And hath [1/5]shed His own [5]blood for my [1]soul

Verse 3
My [1]sin, oh the [6m]bliss of this [4]glorious [1]thought
My [1]sin, not in [6m]part but the [2]whole [5]
Is [1]nailed to the [4]cross, and I [1]bear it no [6m]more
Praise the [1/5]Lord, praise the [5]Lord, O my [1]soul

Verse 4
And [1]Lord, haste the [6m]day when my [4]faith shall be [1]sight
The [1]clouds be rolled [6m]back as a [2]scroll [5]
The [1]trump shall re[4]sound, and the [1]Lord shall de[6m]scend
Even [1/5]so, it is [5]well with my [1]soul`,
  },
  {
    id: 'pd-what-a-friend', title: 'What a Friend We Have in Jesus', artist: 'Joseph Scriven (1855)', key: 'F', tempo: 84, time: '4/4', updated: 0,
    info: 'Tune: CONVERSE by Charles Converse.',
    chart: `Verse 1
[1]What a friend we [4]have in [1]Jesus
All our sins and [5]griefs to [1]bear
[1]What a privi[4]lege to [1]carry
Everything to [5]God in [1]prayer
[5]O what peace we [1]often forfeit
[5]O what needless [1]pain we [5]bear
[1]All because we [4]do not [1]carry
Everything to [5]God in [1]prayer

Verse 2
[1]Have we trials [4]and temp[1]tations
Is there trouble [5]anywhere
[1]We should never [4]be dis[1]couraged
Take it to the [5]Lord in [1]prayer
[5]Can we find a [1]friend so faithful
[5]Who will all our [1]sorrows [5]share
[1]Jesus knows our [4]every [1]weakness
Take it to the [5]Lord in [1]prayer

Verse 3
[1]Are we weak and [4]heavy [1]laden
Cumbered with a [5]load of [1]care
[1]Precious Savior, [4]still our [1]refuge
Take it to the [5]Lord in [1]prayer
[5]Do thy friends de[1]spise, forsake thee
[5]Take it to the [1]Lord in [5]prayer
[1]In His arms He'll [4]take and [1]shield thee
Thou wilt find a [5]solace [1]there`,
  },
  {
    id: 'pd-holy-holy-holy', title: 'Holy, Holy, Holy', artist: 'Reginald Heber (1826)', key: 'D', tempo: 84, time: '4/4', updated: 0,
    info: 'Tune: NICAEA by John B. Dykes.',
    chart: `Verse 1
[1]Holy, holy, [6m]holy! [4]Lord God Al[1]mighty
[1]Early in the [6m]morning our [2]song shall rise to [5]Thee
[1]Holy, holy, [6m]holy, [4]merciful and [1]mighty
[4]God in three [1]Persons, [5]blessed Trini[1]ty

Verse 2
[1]Holy, holy, [6m]holy! [4]All the saints a[1]dore Thee
[1]Casting down their [6m]golden crowns a[2]round the glassy [5]sea
[1]Cherubim and [6m]seraphim [4]falling down be[1]fore Thee
[4]Which wert, and [1]art, and [5]evermore shalt [1]be

Verse 3
[1]Holy, holy, [6m]holy! [4]Though the darkness [1]hide Thee
[1]Though the eye of [6m]sinful man Thy [2]glory may not [5]see
[1]Only Thou art [6m]holy; [4]there is none be[1]side Thee
[4]Perfect in [1]power, in [5]love, and puri[1]ty

Verse 4
[1]Holy, holy, [6m]holy! [4]Lord God Al[1]mighty
[1]All Thy works shall [6m]praise Thy name, in [2]earth, and sky, and [5]sea
[1]Holy, holy, [6m]holy, [4]merciful and [1]mighty
[4]God in three [1]Persons, [5]blessed Trini[1]ty`,
  },
  {
    id: 'pd-come-thou-fount', title: 'Come, Thou Fount of Every Blessing', artist: 'Robert Robinson (1758)', key: 'D', tempo: 92, time: '3/4', updated: 0,
    info: 'Tune: NETTLETON.',
    chart: `Verse 1
[1]Come, Thou Fount of [4]every [1]blessing
Tune my heart to [5]sing Thy [1]grace
[1]Streams of mercy, [4]never [1]ceasing
Call for songs of [5]loudest [1]praise
[5]Teach me some me[1]lodious [5]sonnet
Sung by flaming [1]tongues a[5]bove
[1]Praise the mount! I'm [4]fixed up[1]on it
Mount of Thy re[5]deeming [1]love

Verse 2
[1]Here I raise mine [4]Eben[1]ezer
Hither by Thy [5]help I'm [1]come
[1]And I hope, by [4]Thy good [1]pleasure
Safely to ar[5]rive at [1]home
[5]Jesus sought me [1]when a [5]stranger
Wandering from the [1]fold of [5]God
[1]He, to rescue [4]me from [1]danger
Interposed His [5]precious [1]blood

Verse 3
[1]O to grace how [4]great a [1]debtor
Daily I'm con[5]strained to [1]be
[1]Let Thy goodness, [4]like a [1]fetter
Bind my wandering [5]heart to [1]Thee
[5]Prone to wander, [1]Lord, I [5]feel it
Prone to leave the [1]God I [5]love
[1]Here's my heart, O [4]take and [1]seal it
Seal it for Thy [5]courts a[1]bove`,
  },
  {
    id: 'pd-when-i-survey', title: 'When I Survey the Wondrous Cross', artist: 'Isaac Watts (1707)', key: 'F', tempo: 72, time: '4/4', updated: 0,
    info: 'Tune: HAMBURG by Lowell Mason.',
    chart: `Verse 1
When [1]I sur[4]vey the [1]wondrous [5]cross
On [1]which the [4]Prince of [5]glory [1]died
My [1]richest [4]gain I [1]count but [5]loss
And [1]pour con[4]tempt [5]on all my [1]pride

Verse 2
For[1]bid it, [4]Lord, that [1]I should [5]boast
Save [1]in the [4]death of [5]Christ my [1]God
All [1]the vain [4]things that [1]charm me [5]most
I [1]sacri[4]fice them [5]to His [1]blood

Verse 3
See [1]from His [4]head, His [1]hands, His [5]feet
Sor[1]row and [4]love flow [5]mingled [1]down
Did [1]e'er such [4]love and [1]sorrow [5]meet
Or [1]thorns com[4]pose [5]so rich a [1]crown

Verse 4
Were [1]the whole [4]realm of [1]nature [5]mine
That [1]were a [4]present [5]far too [1]small
Love [1]so a[4]mazing, [1]so di[5]vine
De[1]mands my [4]soul, [5]my life, my [1]all`,
  },
  {
    id: 'pd-jesus-loves-me', title: 'Jesus Loves Me', artist: 'Anna B. Warner (1860)', key: 'C', tempo: 96, time: '4/4', updated: 0,
    info: 'Music by William Bradbury. Great for children’s church.',
    chart: `Verse 1
[1]Jesus loves me! [4]This I [1]know
[1]For the Bible [5]tells me [1]so
[1]Little ones to [4]Him be[1]long
[1]They are weak, but [5]He is [1]strong

Chorus
[1]Yes, Jesus loves me
[4]Yes, Jesus [1]loves me
[1]Yes, Jesus loves me
The [5]Bible tells me [1]so

Verse 2
[1]Jesus loves me! [4]He who [1]died
[1]Heaven's gate to [5]open [1]wide
[1]He will wash a[4]way my [1]sin
[1]Let His little [5]child come [1]in

Verse 3
[1]Jesus loves me! [4]He will [1]stay
[1]Close beside me [5]all the [1]way
[1]Thou hast bled and [4]died for [1]me
[1]I will henceforth [5]live for [1]Thee`,
  },
  {
    id: 'pd-i-surrender-all', title: 'I Surrender All', artist: 'Judson W. Van DeVenter (1896)', key: 'D', tempo: 76, time: '4/4', updated: 0,
    info: 'Music by Winfield Weeden. Chorus has a call-and-echo feel.',
    chart: `Verse 1
[1]All to Jesus [4]I sur[1]render
[1]All to Him I [2]freely [5]give
[1]I will ever [4]love and [1]trust Him
[1]In His presence [5]daily [1]live

Chorus
I sur[1]render [4]all, I sur[1]render all
[1]All to Thee, my [4]blessed [1]Savior
I sur[5]render [1]all

Verse 2
[1]All to Jesus [4]I sur[1]render
[1]Humbly at His [2]feet I [5]bow
[1]Worldly pleasures [4]all for[1]saken
[1]Take me, Jesus, [5]take me [1]now

Verse 3
[1]All to Jesus [4]I sur[1]render
[1]Make me, Savior, [2]wholly [5]Thine
[1]Let me feel the [4]Holy [1]Spirit
[1]Truly know that [5]Thou art [1]mine

Verse 4
[1]All to Jesus [4]I sur[1]render
[1]Lord, I give my[2]self to [5]Thee
[1]Fill me with Thy [4]love and [1]power
[1]Let Thy blessing [5]fall on [1]me

Verse 5
[1]All to Jesus [4]I sur[1]render
[1]Now I feel the [2]sacred [5]flame
[1]O the joy of [4]full sal[1]vation
[1]Glory, glory [5]to His [1]name`,
  },
  {
    id: 'pd-nothing-but-the-blood', title: 'Nothing but the Blood', artist: 'Robert Lowry (1876)', key: 'G', tempo: 100, time: '4/4', updated: 0,
    info: 'Tune: PLAINFIELD.',
    chart: `Verse 1
[1]What can wash a[4]way my [1]sin
[1]Nothing but the [5]blood of [1]Jesus
[1]What can make me [4]whole a[1]gain
[1]Nothing but the [5]blood of [1]Jesus

Chorus
[1]Oh! precious is the [4]flow
That makes me white as [1]snow
No other fount I [4]know
[1]Nothing but the [5]blood of [1]Jesus

Verse 2
[1]For my pardon, [4]this I [1]see
[1]Nothing but the [5]blood of [1]Jesus
[1]For my cleansing [4]this my [1]plea
[1]Nothing but the [5]blood of [1]Jesus

Verse 3
[1]Nothing can for [4]sin a[1]tone
[1]Nothing but the [5]blood of [1]Jesus
[1]Naught of good that [4]I have [1]done
[1]Nothing but the [5]blood of [1]Jesus

Verse 4
[1]This is all my [4]hope and [1]peace
[1]Nothing but the [5]blood of [1]Jesus
[1]This is all my [4]righteous[1]ness
[1]Nothing but the [5]blood of [1]Jesus`,
  },
  {
    id: 'pd-leaning', title: 'Leaning on the Everlasting Arms', artist: 'Elisha Hoffman (1887)', key: 'G', tempo: 104, time: '4/4', updated: 0,
    info: 'Music by Anthony Showalter.',
    chart: `Verse 1
[1]What a fellowship, what a joy di[4]vine
[1]Leaning on the ever[2]lasting [5]arms
[1]What a blessedness, what a peace is [4]mine
[1]Leaning on the [5]everlasting [1]arms

Chorus
[1]Leaning, [4]leaning
[1]Safe and secure from all a[5]larms
[1]Leaning, [4]leaning
[1]Leaning on the [5]everlasting [1]arms

Verse 2
[1]Oh, how sweet to walk in this pilgrim [4]way
[1]Leaning on the ever[2]lasting [5]arms
[1]Oh, how bright the path grows from day to [4]day
[1]Leaning on the [5]everlasting [1]arms

Verse 3
[1]What have I to dread, what have I to [4]fear
[1]Leaning on the ever[2]lasting [5]arms
[1]I have blessed peace with my Lord so [4]near
[1]Leaning on the [5]everlasting [1]arms`,
  },
  {
    id: 'pd-old-rugged-cross', title: 'The Old Rugged Cross', artist: 'George Bennard (1913)', key: 'G', tempo: 72, time: '3/4', updated: 0,
    info: 'Slow waltz feel.',
    chart: `Verse 1
On a [1]hill far away stood an [4]old rugged [1]cross
The [1]emblem of suffering and [5]shame
And I [1]love that old cross where the [4]dearest and [1]best
For a [1]world of lost [5]sinners was [1]slain

Chorus
So I'll [5]cherish the old rugged [1]cross
Till my [4]trophies at [1]last I lay down
I will [1]cling to the old rugged [4]cross
And ex[1]change it some [5]day for a [1]crown

Verse 2
Oh, that [1]old rugged cross, so de[4]spised by the [1]world
Has a [1]wondrous at[5]traction for me
For the [1]dear Lamb of God left His [4]glory a[1]bove
To [1]bear it to [5]dark Calva[1]ry

Verse 3
In that [1]old rugged cross, stained with [4]blood so di[1]vine
A [1]wondrous beauty I [5]see
For 'twas [1]on that old cross Jesus [4]suffered and [1]died
To [1]pardon and [5]sancti[1]fy me

Verse 4
To the [1]old rugged cross I will [4]ever be [1]true
Its [1]shame and reproach gladly [5]bear
Then He'll [1]call me some day to my [4]home far a[1]way
Where His [1]glory for[5]ever I'll [1]share`,
  },
  {
    id: 'pd-oh-how-i-love-jesus', title: 'Oh, How I Love Jesus', artist: 'Frederick Whitfield (1855)', key: 'F', tempo: 96, time: '3/4', updated: 0,
    info: 'Traditional American melody.',
    chart: `Verse 1
There [1]is a name I [4]love to [1]hear
I love to sing its [5]worth
It [1]sounds like music [4]in mine [1]ear
The [1]sweetest [5]name on [1]earth

Chorus
[1]Oh, how I love Jesus
Oh, how I love [5]Jesus
Oh, how I [1]love [4]Je[1]sus
Be[1]cause He [5]first loved [1]me

Verse 2
It [1]tells me of a [4]Savior's [1]love
Who died to set me [5]free
It [1]tells me of His [4]precious [1]blood
The [1]sinner's [5]perfect [1]plea

Verse 3
It [1]tells me what my [4]Father [1]hath
In store for every [5]day
And [1]though I tread a [4]darksome [1]path
Yields [1]sunshine [5]all the [1]way`,
  },
  {
    id: 'pd-trust-and-obey', title: 'Trust and Obey', artist: 'John H. Sammis (1887)', key: 'F', tempo: 60, time: '6/8', updated: 0,
    info: 'Music by Daniel Towner.',
    chart: `Verse 1
When we [1]walk with the Lord in the [4]light of His [1]Word
What a glory He sheds on our [5]way
While we [1]do His good will, He a[4]bides with us [1]still
And with [1]all who will [5]trust and o[1]bey

Chorus
[1]Trust and o[4]bey, for there's [1]no other way
To be [1]happy in [4]Jesus, but to [1]trust [5]and o[1]bey

Verse 2
Not a [1]shadow can rise, not a [4]cloud in the [1]skies
But His smile quickly drives it a[5]way
Not a [1]doubt or a fear, not a [4]sigh or a [1]tear
Can a[1]bide while we [5]trust and o[1]bey

Verse 3
Then in [1]fellowship sweet we will [4]sit at His [1]feet
Or we'll walk by His side in the [5]way
What He [1]says we will do, where He [4]sends we will [1]go
Never [1]fear, only [5]trust and o[1]bey`,
  },
  {
    id: 'pd-joyful-joyful', title: 'Joyful, Joyful, We Adore Thee', artist: 'Henry van Dyke (1907)', key: 'G', tempo: 100, time: '4/4', updated: 0,
    info: 'Tune: HYMN TO JOY (Beethoven).',
    chart: `Verse 1
[1]Joyful, joyful, [5]we a[1]dore Thee
[1]God of [4]glory, [1]Lord of [5]love
[1]Hearts unfold like [5]flowers be[1]fore Thee
[1]Opening [5]to the [1]sun above
[5]Melt the clouds of [1]sin and sadness
[5]Drive the dark of [1]doubt a[5]way
[1]Giver of im[4]mortal [1]gladness
[1]Fill us [5]with the [1]light of day

Verse 2
[1]All Thy works with [5]joy sur[1]round Thee
[1]Earth and [4]heaven re[1]flect Thy [5]rays
[1]Stars and angels [5]sing a[1]round Thee
[1]Center [5]of un[1]broken praise
[5]Field and forest, [1]vale and mountain
[5]Flowery meadow, [1]flashing [5]sea
[1]Singing bird and [4]flowing [1]fountain
[1]Call us [5]to re[1]joice in Thee

Verse 3
[1]Thou art giving [5]and for[1]giving
[1]Ever [4]blessing, [1]ever [5]blest
[1]Wellspring of the [5]joy of [1]living
[1]Ocean [5]depth of [1]happy rest
[5]Thou our Father, [1]Christ our Brother
[5]All who live in [1]love are [5]Thine
[1]Teach us how to [4]love each [1]other
[1]Lift us [5]to the [1]joy divine`,
  },
  {
    id: 'pd-be-thou-my-vision', title: 'Be Thou My Vision', artist: 'Irish, tr. Mary Byrne & Eleanor Hull (1912)', key: 'D', tempo: 84, time: '3/4', updated: 0,
    info: 'Tune: SLANE (Irish folk melody).',
    chart: `Verse 1
[1]Be Thou my [4]Vision, O [1]Lord of my [4]heart
[1]Naught be all [4]else to me, [1]save that Thou [5]art
[4]Thou my best [5]Thought, by [6m]day or by [4]night
[1]Waking or [4]sleeping, Thy [1]presence my [5]light [1]

Verse 2
[1]Be Thou my [4]Wisdom, and [1]Thou my true [4]Word
[1]I ever [4]with Thee and [1]Thou with me, [5]Lord
[4]Thou my great [5]Father, [6m]I Thy true [4]son
[1]Thou in me [4]dwelling, and [1]I with Thee [5]one [1]

Verse 3
[1]Riches I [4]heed not, nor [1]man's empty [4]praise
[1]Thou mine In[4]heritance, [1]now and al[5]ways
[4]Thou and Thou [5]only, [6m]first in my [4]heart
[1]High King of [4]Heaven, my [1]Treasure Thou [5]art [1]

Verse 4
[1]High King of [4]Heaven, my [1]victory [4]won
[1]May I reach [4]Heaven's joys, O [1]bright Heaven's [5]Sun
[4]Heart of my [5]own heart, what[6m]ever be[4]fall
[1]Still be my [4]Vision, O [1]Ruler of [5]all [1]`,
  },
  {
    id: 'pd-silent-night', title: 'Silent Night', artist: 'Joseph Mohr, tr. John F. Young (1859)', key: 'C', tempo: 60, time: '3/4', updated: 0,
    info: 'Music by Franz Gruber. Christmas.',
    chart: `Verse 1
[1]Silent night, holy night
[5]All is calm, [1]all is bright
[4]Round yon Virgin [1]Mother and Child
[4]Holy Infant so [1]tender and mild
[5]Sleep in heavenly [1]peace
[1]Sleep in [5]heavenly [1]peace

Verse 2
[1]Silent night, holy night
[5]Shepherds quake [1]at the sight
[4]Glories stream from [1]heaven afar
[4]Heavenly hosts sing [1]Alleluia
[5]Christ the Savior is [1]born
[1]Christ the [5]Savior is [1]born

Verse 3
[1]Silent night, holy night
[5]Son of God, [1]love's pure light
[4]Radiant beams from [1]Thy holy face
[4]With the dawn of re[1]deeming grace
[5]Jesus, Lord, at Thy [1]birth
[1]Jesus, [5]Lord, at Thy [1]birth`,
  },
  {
    id: 'pd-doxology', title: 'Doxology (Praise God from Whom All Blessings Flow)', artist: 'Thomas Ken (1674)', key: 'G', tempo: 80, time: '4/4', updated: 0,
    info: 'Tune: OLD 100TH. Often sung at the offering.',
    chart: `[1]Praise God, from [5]whom all [6m]blessings [5]flow
[1]Praise Him, all [4]creatures [5]here be[1]low
[1]Praise Him a[5]bove, ye [6m]heavenly [5]host
[4]Praise Father, [1]Son, and [5]Holy [1]Ghost
[4]A[1]men`,
  },
];

// Tags shown as filters in the library.
const STARTER_TAGS = {
  'pd-amazing-grace': ['Worship'], 'pd-blessed-assurance': ['Praise'], 'pd-it-is-well': ['Worship'],
  'pd-what-a-friend': ['Worship'], 'pd-holy-holy-holy': ['Worship', 'Opening'], 'pd-come-thou-fount': ['Praise'],
  'pd-when-i-survey': ['Communion', 'Easter'], 'pd-jesus-loves-me': ['Kids'], 'pd-i-surrender-all': ['Altar call'],
  'pd-nothing-but-the-blood': ['Communion', 'Praise'], 'pd-leaning': ['Praise'], 'pd-old-rugged-cross': ['Easter', 'Communion'],
  'pd-oh-how-i-love-jesus': ['Praise', 'Kids'], 'pd-trust-and-obey': ['Closing'], 'pd-joyful-joyful': ['Praise', 'Opening'],
  'pd-be-thou-my-vision': ['Worship'], 'pd-silent-night': ['Christmas'], 'pd-doxology': ['Offering', 'Closing'],
};
STARTER_SONGS.forEach((s) => { s.tags = ['Hymn', ...(STARTER_TAGS[s.id] || [])]; });
