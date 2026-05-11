import { Injectable } from '@nestjs/common';
import type {
  TimelineEvent,
  PaginatedResponse,
  TimelineQuery,
} from '@afropedia/shared';

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: '1',
    year: 1415,
    title: 'Portuguese Capture of Ceuta',
    region: 'North Africa',
    category: 'Politics',
    summary:
      'Portugal seizes the North African port of Ceuta, beginning European colonial expansion into Africa.',
    content: {
      beginner:
        'Portugal took over a city in North Africa called Ceuta. This was one of the first times a European country took control of land in Africa.',
      intermediate:
        'In 1415, Portuguese forces under King João I captured the strategic port city of Ceuta on the Moroccan coast. This marked the start of the Age of Exploration and European expansion into Africa, setting the stage for the transatlantic slave trade that would follow over the next century.',
      advanced:
        "The Portuguese conquest of Ceuta (1415) is regarded as the inaugural act of European colonial expansion in Africa. Motivated by commercial ambitions to bypass Arab middlemen in the trans-Saharan gold and spice trade, the campaign established a template for subsequent Portuguese encroachment down the West African coast. Prince Henry 'the Navigator' drew critical lessons from Ceuta that informed the systematic charting of African coastlines thereafter.",
    },
    references: [
      {
        title: 'The Portuguese Seaborne Empire, 1415–1825',
        author: 'C. R. Boxer',
        type: 'book',
      },
      {
        title: 'Africa and Africans in the Making of the Atlantic World',
        author: 'John Thornton',
        type: 'book',
      },
    ],
  },
  {
    id: '2',
    year: 1441,
    title: 'First Enslaved Africans Brought to Portugal',
    region: 'West Africa',
    category: 'Resistance',
    summary:
      'Portuguese sailors bring the first enslaved Africans to Lisbon, initiating the transatlantic slave trade.',
    content: {
      beginner:
        'Portuguese sailors kidnapped people from the coast of West Africa and brought them to Portugal to work as slaves. This was the beginning of a very dark part of history.',
      intermediate:
        'In 1441, Portuguese navigator Antão Gonçalves captured a small group of Africans near the Rio de Oro on the coast of present-day Mauritania and brought them back to Lisbon. This act inaugurated the Portuguese slave trade and laid the groundwork for the transatlantic slave trade that would forcibly displace millions of Africans over the next four centuries.',
      advanced:
        'The 1441 expedition of Antão Gonçalves represents the earliest documented instance of sub-Saharan Africans being enslaved by Western Europeans. The event is significant not only as an origin point of the Atlantic slave trade but also for the legal and theological frameworks it prompted — Pope Nicholas V subsequently issued the papal bull Dum Diversas (1452), granting Portugal the right to enslave "Saracens, pagans and any other unbelievers," providing ecclesiastical legitimation for racial slavery.',
    },
    references: [
      {
        title: 'The Slave Trade: The Story of the Atlantic Slave Trade',
        author: 'Hugh Thomas',
        type: 'book',
      },
      {
        title: 'Dum Diversas (1452) — Papal Bull',
        type: 'website',
        url: 'https://en.wikipedia.org/wiki/Dum_Diversas',
      },
    ],
  },
  {
    id: '3',
    year: 1492,
    title: 'African Presence in Columbus\'s Voyages',
    region: 'Caribbean',
    category: 'Culture',
    summary:
      'Africans sail with Columbus on his voyages to the Americas, predating the formal slave trade to the New World.',
    content: {
      beginner:
        'When Christopher Columbus sailed to the Americas, Africans were part of his crew. Africans have been in the Americas since the very beginning of European exploration.',
      intermediate:
        "Historians have documented the presence of Africans — including Pedro Alonso Niño, believed to be of African descent — among Columbus's crew. This complicates the narrative of African arrival in the Americas solely through enslavement, indicating a more complex early presence.",
      advanced:
        "Scholarly debate surrounds the identity and number of Africans in Columbus's 1492 expedition. Pedro Alonso Niño, the navigator of the Niña, is frequently cited as of African descent. Ivan Van Sertima's controversial thesis in 'They Came Before Columbus' (1976) argued for pre-Columbian African contact, though mainstream archaeology does not support that claim. What is documented is African participation in the Conquest era as sailors, soldiers (called 'ladinos'), and interpreters from the earliest voyages.",
    },
    references: [
      {
        title: "Before Columbus: Exploration and Colonization from the Mediterranean to the Atlantic",
        author: 'Felipe Fernández-Armesto',
        type: 'book',
      },
    ],
  },
  {
    id: '4',
    year: 1619,
    title: 'First Enslaved Africans in Colonial Virginia',
    region: 'United States',
    category: 'Resistance',
    summary:
      'A ship arrives in Point Comfort, Virginia carrying the first enslaved Africans to English North America.',
    content: {
      beginner:
        'In 1619, a ship brought the first enslaved African people to the English colonies in North America. This marked the beginning of slavery in what would become the United States.',
      intermediate:
        "In August 1619, the English privateer ship White Lion arrived at Point Comfort, Virginia, carrying 'twenty and odd' Angolans who had been captured from a Portuguese slave ship. They were traded for food and supplies, making them the first documented Africans in English North America. Their legal status — enslaved or indentured — is debated by historians, but their arrival marks a defining moment in American history.",
      advanced:
        "The 1619 arrival is the subject of renewed scholarly and public debate, most prominently through The New York Times's 1619 Project (Nikole Hannah-Jones, 2019), which argued it should be treated as America's true founding moment. Historians including Sean Wilentz and Gordon Wood challenged aspects of the project's framing, while scholars like Nell Irvin Painter and Ibram X. Kendi broadly supported centering the African experience. The 1619 Angolans — among them Anthony and Mary Johnson, who would later own land and cattle — demonstrate the contingent and evolving nature of racial slavery in early Virginia.",
    },
    references: [
      {
        title: 'The 1619 Project: A New Origin Story',
        author: 'Nikole Hannah-Jones',
        type: 'book',
        url: 'https://pulitzerenter.org/prize/2020-public-interest',
      },
      {
        title: 'The Half Has Never Been Told: Slavery and the Making of American Capitalism',
        author: 'Edward E. Baptist',
        type: 'book',
      },
    ],
  },
  {
    id: '5',
    year: 1791,
    endYear: 1804,
    title: 'Haitian Revolution',
    region: 'Caribbean',
    category: 'Resistance',
    summary:
      'Enslaved people in Saint-Domingue rise up in the only successful slave revolt in history, founding the nation of Haiti.',
    content: {
      beginner:
        'In Haiti (then called Saint-Domingue), enslaved people fought back against their enslavers in a massive uprising. After years of battle, they won their freedom and created the first Black republic in the world.',
      intermediate:
        'Beginning with the Bois Caïman ceremony in August 1791, enslaved Africans and their descendants in the French colony of Saint-Domingue launched a revolution under leaders including Toussaint Louverture and Jean-Jacques Dessalines. After 13 years of fighting against French, Spanish, and British forces, Haiti declared independence on January 1, 1804 — the first free Black republic in the world and the only successful slave revolt in history.',
      advanced:
        "The Haitian Revolution (1791–1804) represents the most consequential event in Atlantic history after the American Revolution, and arguably its most radical expression. C. L. R. James's landmark study 'The Black Jacobins' (1938) positioned the revolution within the broader currents of Enlightenment universalism, arguing that Toussaint Louverture was the consummate product of French revolutionary ideals. Sudhir Hazareesingh and Laurent Dubois have more recently emphasized the revolution's autonomous ideological origins in African spiritual practice and the specific grievances of Saint-Domingue's complex racial caste system. France's demand for reparations (150 million francs, paid until 1947) as a condition of recognition created a debt that stunted Haitian development for generations.",
    },
    references: [
      {
        title: 'The Black Jacobins: Toussaint L\'Ouverture and the San Domingo Revolution',
        author: 'C. L. R. James',
        type: 'book',
      },
      {
        title: 'Avengers of the New World: The Story of the Haitian Revolution',
        author: 'Laurent Dubois',
        type: 'book',
      },
    ],
  },
  {
    id: '6',
    year: 1807,
    title: 'British Abolition of the Slave Trade',
    region: 'United Kingdom',
    category: 'Politics',
    summary:
      'Britain passes the Slave Trade Act, abolishing the trading (not yet ownership) of enslaved people across the British Empire.',
    content: {
      beginner:
        'Britain passed a law saying it was illegal to buy or sell enslaved people. This was an important step, though people who were already enslaved in British colonies were not yet free.',
      intermediate:
        "After years of campaigning by abolitionists including William Wilberforce, Olaudah Equiano, and the Sons of Africa, Britain passed the Slave Trade Act in 1807, making it illegal for British subjects to participate in the transatlantic slave trade. Slavery itself remained legal in British colonies until the Slavery Abolition Act of 1833, and even then, enslaved people were forced into 'apprenticeship' until 1838.",
      advanced:
        "The 1807 Act is often presented as a humanitarian triumph, but Eric Williams's foundational work 'Capitalism and Slavery' (1944) argued that abolition was driven primarily by economic factors — specifically the decline of the sugar-plantation system. This thesis has been debated but never fully refuted. Crucially, the British government paid £20 million in compensation — to enslavers, not the enslaved. A UCL database (Legacies of British Slave-ownership) has traced how that compensation money seeded fortunes that shaped modern British institutions, including banks, insurance companies, and universities.",
    },
    references: [
      {
        title: 'Capitalism and Slavery',
        author: 'Eric Williams',
        type: 'book',
      },
      {
        title: 'Legacies of British Slave-Ownership — UCL Database',
        type: 'website',
        url: 'https://www.ucl.ac.uk/lbs/',
      },
    ],
  },
  {
    id: '7',
    year: 1865,
    title: 'Thirteenth Amendment Abolishes Slavery in the United States',
    region: 'United States',
    category: 'Politics',
    summary:
      'The United States formally abolishes slavery with the ratification of the Thirteenth Amendment, following the Civil War.',
    content: {
      beginner:
        'After the Civil War, the United States passed a law that officially made slavery illegal. Millions of Black people were finally free, though they still faced many challenges.',
      intermediate:
        "Ratified on December 6, 1865, the Thirteenth Amendment abolished slavery and involuntary servitude 'except as a punishment for crime' — a clause that would be exploited for decades through the convict-leasing system. Reconstruction (1865–1877) briefly brought Black Americans into political life, with 16 Black men serving in Congress, before federal troops were withdrawn and Jim Crow laws began to roll back these gains.",
      advanced:
        "The Thirteenth Amendment's 'punishment for crime' exception has generated substantial scholarly and advocacy attention in recent decades. Douglas Blackmon's 'Slavery by Another Name' (2008) and Michelle Alexander's 'The New Jim Crow' (2010) trace a continuous line from convict leasing through mass incarceration, arguing that the exception effectively preserved racial coercion in American labor. The constitutional text was deliberately chosen to remain narrow: Republican moderates rejected language that would have guaranteed economic rights or land redistribution, foreclosing what Thaddeus Stevens called 'a radical reorganization of Southern institutions.'",
    },
    references: [
      {
        title: 'Slavery by Another Name: The Re-Enslavement of Black Americans from the Civil War to World War II',
        author: 'Douglas A. Blackmon',
        type: 'book',
      },
      {
        title: 'The New Jim Crow: Mass Incarceration in the Age of Colorblindness',
        author: 'Michelle Alexander',
        type: 'book',
      },
    ],
  },
  {
    id: '8',
    year: 1884,
    endYear: 1885,
    title: 'Berlin Conference — Partition of Africa',
    region: 'Africa',
    category: 'Politics',
    summary:
      'European powers meet in Berlin to divide the African continent among themselves, with no African representation.',
    content: {
      beginner:
        'Leaders from European countries met in Germany and drew lines on a map to divide up Africa. No African people were invited. This meeting led to most of Africa being controlled by European countries.',
      intermediate:
        "At the Berlin Conference (1884–85), convened by German Chancellor Otto von Bismarck, 14 European nations agreed on rules for colonizing Africa. The 'Scramble for Africa' that followed resulted in 90% of the continent being under European control by 1900. Pre-existing African kingdoms, ethnic boundaries, and trade routes were ignored in the drawing of colonial borders that persist to this day.",
      advanced:
        "The Berlin Conference codified the doctrine of 'effective occupation,' requiring European powers to demonstrate actual administrative control to claim territory — accelerating the violent suppression of African polities. Scholars including Mahmood Mamdani ('Citizen and Subject,' 1996) and Frantz Fanon ('The Wretched of the Earth,' 1961) have analyzed how colonial administrative structures created a bifurcated citizenship that shaped postcolonial governance failures. The conference also established the Congo Free State under King Léopold II of Belgium, whose reign produced what Adam Hochschild estimates as 10 million deaths.",
    },
    references: [
      {
        title: "King Leopold's Ghost: A Story of Greed, Terror, and Heroism in Colonial Africa",
        author: 'Adam Hochschild',
        type: 'book',
      },
      {
        title: 'Citizen and Subject: Contemporary Africa and the Legacy of Late Colonialism',
        author: 'Mahmood Mamdani',
        type: 'book',
      },
    ],
  },
  {
    id: '9',
    year: 1919,
    title: 'First Pan-African Congress',
    region: 'Europe',
    category: 'Politics',
    summary:
      'W. E. B. Du Bois organizes the first Pan-African Congress in Paris, laying the foundation for African independence movements.',
    content: {
      beginner:
        'A group of Black leaders from Africa, the Caribbean, and the United States met in Paris to talk about the rights of African people around the world. This was an important moment for the idea that all African people deserve freedom and respect.',
      intermediate:
        "Organized by W. E. B. Du Bois and held in Paris in 1919 alongside the Versailles Peace Conference, the First Pan-African Congress brought together 57 delegates from 15 countries. Du Bois sought (unsuccessfully) to have the rights of Africans addressed in the peace treaty. The Congress nonetheless established Pan-Africanism as an organized international movement, with subsequent congresses building toward African independence.",
      advanced:
        "The 1919 Congress must be situated within Du Bois's evolving thought — his 'double consciousness' framework ('The Souls of Black Folk,' 1903) was giving way to a more explicitly anti-colonial and socialist analysis. The Congress also highlights the strategic tensions between Afro-American and Caribbean intellectuals: Marcus Garvey's competing UNIA movement, emphasizing Black nationalism and repatriation to Africa, attracted far larger popular followings than Du Bois's integrationist approach. Subsequent Pan-African Congresses (1921, 1923, 1927, 1945) increasingly involved African-born participants, culminating in the 1945 Manchester Congress that launched Kwame Nkrumah and Jomo Kenyatta into political prominence.",
    },
    references: [
      {
        title: 'The World and Africa: An Inquiry into the Part Which Africa Has Played in World History',
        author: 'W. E. B. Du Bois',
        type: 'book',
      },
      {
        title: 'Black Reconstruction in America',
        author: 'W. E. B. Du Bois',
        type: 'book',
      },
    ],
  },
  {
    id: '10',
    year: 1920,
    endYear: 1940,
    title: 'The Harlem Renaissance',
    region: 'United States',
    category: 'Culture',
    summary:
      'A flowering of Black art, literature, and music in Harlem, New York that transformed American culture and Black identity.',
    content: {
      beginner:
        'In a neighborhood in New York City called Harlem, Black artists, writers, and musicians created incredible work. Their creativity changed American art and music forever and made Black people proud of their culture.',
      intermediate:
        "The Harlem Renaissance (roughly 1920–1940) was an explosion of Black intellectual and artistic life centered in Harlem, New York. Figures including Langston Hughes, Zora Neale Hurston, Duke Ellington, Louis Armstrong, and Jacob Lawrence produced work that challenged racist stereotypes and asserted Black humanity and creativity. The movement coincided with the Great Migration of Black Americans from the rural South to northern cities.",
      advanced:
        "The Harlem Renaissance is now understood not merely as a cultural moment but as a site of contested political ideologies. Alain Locke's anthology 'The New Negro' (1925) framed the movement in terms of racial uplift and integration, while Garveyite nationalism represented an alternative politics of Black sovereignty. Houston A. Baker Jr. ('Modernism and the Harlem Renaissance,' 1987) challenged the movement's canonical boundaries, arguing that vernacular and blues traditions were as central as the high-literary output celebrated by Locke. The Renaissance's legacies are also transatlantic: it catalyzed the Négritude movement (Aimé Césaire, Léopold Sédar Senghor) and influenced Afro-Caribbean political thought.",
    },
    references: [
      {
        title: 'The New Negro: An Interpretation',
        author: 'Alain Locke',
        type: 'book',
      },
      {
        title: 'Zora Neale Hurston: A Life in Letters',
        author: 'Carla Kaplan',
        type: 'book',
      },
    ],
  },
  {
    id: '11',
    year: 1955,
    endYear: 1968,
    title: 'American Civil Rights Movement',
    region: 'United States',
    category: 'Resistance',
    summary:
      'Black Americans organize mass nonviolent resistance to segregation and racial violence, winning landmark civil rights legislation.',
    content: {
      beginner:
        'Black Americans came together to fight against unfair laws that treated them as second-class citizens. Through marches, sit-ins, and boycotts, they pushed the government to change the laws.',
      intermediate:
        "The Civil Rights Movement used nonviolent direct action — including the Montgomery Bus Boycott (1955), lunch counter sit-ins, Freedom Rides, and the March on Washington (1963) — to challenge Jim Crow segregation. Key legislative victories included the Civil Rights Act (1964) and Voting Rights Act (1965). Leaders like Dr. Martin Luther King Jr., Fannie Lou Hamer, John Lewis, and Rosa Parks became national figures, though the movement was far broader than any individual.",
      advanced:
        "Revisionist historiography has challenged the 'Montgomery to Memphis' narrative centered on King, foregrounding the essential contributions of local organizers and women. Charles Payne's 'I've Got the Light of Freedom' (1995) documented the grass-roots organizing tradition in Mississippi led by Ella Baker and Bob Moses. Scholars including Peniel Joseph have emphasized the parallel development of Black Power as not opposed to but continuous with civil rights organizing. The movement's international dimensions — its Cold War framing, its resonance with African independence struggles, and the State Department's interest in projecting racial progress abroad — have also received substantial scholarly attention.",
    },
    references: [
      {
        title: "I've Got the Light of Freedom: The Organizing Tradition and the Mississippi Freedom Struggle",
        author: 'Charles M. Payne',
        type: 'book',
      },
      {
        title: 'Eyes on the Prize (documentary series)',
        type: 'documentary',
      },
    ],
  },
  {
    id: '12',
    year: 1960,
    title: 'Year of Africa — Independence Across the Continent',
    region: 'Africa',
    category: 'Politics',
    summary:
      '17 African nations gain independence in a single year, reshaping the world map and global politics.',
    content: {
      beginner:
        '1960 was a huge year for Africa. Seventeen countries broke free from European colonial rule and became independent nations. This was a moment of great hope and celebration across the continent.',
      intermediate:
        "In 1960, 17 African countries gained independence, including Nigeria, Senegal, Côte d'Ivoire, Mali, Cameroon, and the Democratic Republic of Congo. This 'Year of Africa' represented the culmination of decades of nationalist organizing. Leaders like Patrice Lumumba (Congo), Léopold Sédar Senghor (Senegal), and Félix Houphouët-Boigny (Côte d'Ivoire) embodied competing visions for the post-colonial future.",
      advanced:
        "The 1960 independence wave must be analyzed alongside the structural constraints inherited from colonialism — 'neo-colonialism,' as Kwame Nkrumah termed it in his 1965 book of that title. Formal political independence coexisted with continued economic dependency through franc CFA monetary arrangements, French military bases, and continued extraction by multinational corporations. The assassination of Patrice Lumumba (January 1961), documented to involve CIA and Belgian intelligence involvement, demonstrated the Cold War context in which African sovereignty was exercised. Jean-Paul Sartre's preface to Fanon's 'The Wretched of the Earth' situates these struggles within a global anti-colonial framework.",
    },
    references: [
      {
        title: 'Neo-Colonialism: The Last Stage of Imperialism',
        author: 'Kwame Nkrumah',
        type: 'book',
      },
      {
        title: 'The Wretched of the Earth',
        author: 'Frantz Fanon',
        type: 'book',
      },
    ],
  },
  {
    id: '13',
    year: 1994,
    title: 'End of Apartheid — South African Elections',
    region: 'South Africa',
    category: 'Politics',
    summary:
      "South Africa holds its first fully democratic elections; Nelson Mandela becomes the country's first Black president.",
    content: {
      beginner:
        'For a long time, South Africa had a system called apartheid where Black people were not allowed the same rights as white people. In 1994, everyone got to vote for the first time and Nelson Mandela, who had been in prison for 27 years, became president.',
      intermediate:
        "After 46 years of apartheid — a system of legally enforced racial segregation — South Africa held its first free and fair elections in April 1994. The African National Congress (ANC) won with 62% of the vote, and Nelson Mandela was inaugurated as president on May 10, 1994. The Truth and Reconciliation Commission (1996–1998), chaired by Archbishop Desmond Tutu, sought to document apartheid crimes and provide amnesty in exchange for full disclosure.",
      advanced:
        "The South African transition is theorized as a case study in 'negotiated revolution.' Sampie Terreblanche ('A History of Inequality in South Africa') argues that the political settlement preserved the economic structures of apartheid, embedding economic inequality into post-apartheid society. The CODESA negotiations granted political rights while leaving economic power largely intact — a compromise that has fueled ongoing debates about land reform, wealth redistribution, and the limits of constitutionalism. Achille Mbembe's work situates South Africa within a broader African postcolonial condition characterized by what he terms 'necropolitics.'",
    },
    references: [
      {
        title: 'Long Walk to Freedom',
        author: 'Nelson Mandela',
        type: 'book',
      },
      {
        title: 'No Future Without Forgiveness',
        author: 'Desmond Tutu',
        type: 'book',
      },
    ],
  },
  {
    id: '14',
    year: 2013,
    title: 'Black Lives Matter Movement Founded',
    region: 'United States',
    category: 'Resistance',
    summary:
      'Following the acquittal of Trayvon Martin\'s killer, Alicia Garza, Patrisse Cullors, and Opal Tometi found the Black Lives Matter movement.',
    content: {
      beginner:
        'After a court decided not to punish the man who killed a young Black teenager named Trayvon Martin, three Black women started a movement called Black Lives Matter. It became one of the most important movements fighting for racial equality.',
      intermediate:
        "In July 2013, following the acquittal of George Zimmerman in the killing of 17-year-old Trayvon Martin, Alicia Garza wrote a 'love letter to Black people' on Facebook. Her friend Patrisse Cullors added the hashtag #BlackLivesMatter; Opal Tometi helped build its digital infrastructure. The movement grew into a global network following the police killings of Michael Brown (Ferguson, 2014), Eric Garner (New York, 2014), and George Floyd (Minneapolis, 2020).",
      advanced:
        "Black Lives Matter represents a distinct ideological formation from mid-twentieth-century civil rights organizing — explicitly queer-affirming, decentralized, and skeptical of charismatic leadership models. Keeanga-Yamahtta Taylor ('From #BlackLivesMatter to Black Liberation,' 2016) situates the movement within a critique of the racial capitalism that persisted after formal legal equality was achieved. The 2020 uprising following George Floyd's murder was the largest protest movement in American history by participant count (estimates: 15–26 million), prompting legislative activity at the state level and a global reckoning with statues and symbols of colonial and slaveholding figures.",
    },
    references: [
      {
        title: 'When They Call You a Terrorist: A Black Lives Matter Memoir',
        author: 'Patrisse Khan-Cullors',
        type: 'book',
      },
      {
        title: 'From #BlackLivesMatter to Black Liberation',
        author: 'Keeanga-Yamahtta Taylor',
        type: 'book',
      },
    ],
  },
  {
    id: '15',
    year: 2018,
    title: 'Wakanda and the Rise of Afrofuturism in Mainstream Culture',
    region: 'United States',
    category: 'Culture',
    summary:
      'Black Panther (2018) brings Afrofuturism to a global mainstream audience, sparking worldwide conversations about African identity and possibility.',
    content: {
      beginner:
        "The movie Black Panther showed the world a vision of Africa as a powerful, technologically advanced civilization. It was hugely popular and made many people proud of African culture and heritage.",
      intermediate:
        "Marvel's Black Panther (dir. Ryan Coogler, 2018) grossed over $1.3 billion worldwide and became a cultural phenomenon, particularly for Black audiences who saw themselves represented as powerful, innovative, and central to global history. The film drew on a rich tradition of Afrofuturism — the use of science fiction and speculative thought to imagine African and diasporic futures — with roots in Sun Ra, Samuel Delany, Octavia Butler, and Janelle Monáe.",
      advanced:
        "Afrofuturism as a critical framework was named by cultural critic Mark Dery in 1994 but its artistic practice predates the term considerably. Kodwo Eshun's 'Further Considerations on Afrofuturism' (CR: The New Centennial Review, 2003) theorizes it as a counter-memory project that reclaims futurity from a modernity that has historically positioned Black people outside of time. Black Panther's Wakanda — a nation that escaped colonialism and developed independently — functions as an inversion of the Scramble for Africa narrative. Scholars including Reynaldo Anderson and Charles E. Jones ('Afrofuturism 2.0,' 2016) trace the movement's contemporary manifestations across visual art, music (Sun Ra, Parliament-Funkadelic, Kendrick Lamar), and literature (N. K. Jemisin, Nnedi Ofofor).",
    },
    references: [
      {
        title: "Afrofuturism: The World of Black Sci-Fi and Fantasy Culture",
        author: 'Ytasha L. Womack',
        type: 'book',
      },
      {
        title: 'Kindred',
        author: 'Octavia E. Butler',
        type: 'book',
      },
    ],
  },
];

@Injectable()
export class TimelineService {
  getTimeline(query: TimelineQuery): PaginatedResponse<TimelineEvent> {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 10;
    const startYear = query.startYear;
    const endYear = query.endYear;
    const category = query.category?.toLowerCase();
    const region = query.region?.toLowerCase();

    let filtered = TIMELINE_EVENTS.filter((event) => {
      if (startYear !== undefined && event.year < startYear) return false;
      if (endYear !== undefined && event.year > endYear) return false;
      if (category !== undefined && event.category.toLowerCase() !== category)
        return false;
      if (region !== undefined && event.region.toLowerCase() !== region)
        return false;
      return true;
    });

    filtered = filtered.sort((a, b) => a.year - b.year);

    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const offset = (page - 1) * pageSize;
    const data = filtered.slice(offset, offset + pageSize);

    return { data, total, page, pageSize, totalPages };
  }
}
