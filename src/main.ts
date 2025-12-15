/**📌 Milestone 1
Crea un type alias Person per rappresentare una persona generica.

Il tipo deve includere le seguenti proprietà:

id: numero identificativo, non modificabile
name: nome completo, stringa non modificabile
birth_year: anno di nascita, numero
death_year: anno di morte, numero opzionale
biography: breve biografia, stringa
image: URL dell'immagine, stringa
 */

type Person = {
  readonly id:  number,
  readonly name:  string,
  birth_year: number,
  death_year?: number,
  biography: string,
  image: string,
}

/**
📌 Milestone 2
Crea un type alias Actress che oltre a tutte le proprietà di Person, aggiunge le seguenti proprietà:

most_famous_movies: una tuple di 3 stringhe
awards: una stringa
nationality: una stringa tra un insieme definito di valori.
Le nazionalità accettate sono: American, British, Australian, Israeli-American, South African, French, Indian, Israeli, Spanish, South Korean, Chinese.
 */
type Nationality =  "American"| "British"| "Australian"| "Israeli-American"| "South African"| "French"| "Indian"| "Israeli"| "Spanish"| "South Korean"| "Chinese"

const nazioni: string[] = ["American", "British", "Australian", "Israeli-American", "South African", "French", "Indian", "Israeli", "Spanish", "South Korean", "Chinese"]

type Actress = Person & {
  most_famous_movies: [string , string , string],
awards: string,
nationality: Nationality
}

/**📌 Milestone 3
Crea una funzione getActress che, dato un id, effettua una chiamata a:

GET /actresses/:id
La funzione deve restituire l’oggetto Actress, se esiste, oppure null se non trovato.

Utilizza un type guard chiamato isActress per assicurarti che la struttura del dato ricevuto sia corretta.

http://localhost:3333/actresses/:id
 */

function isActress(dati:unknown): dati is Actress {
  if(
    dati && typeof dati === "object" &&
    "most_famous_movies" in dati &&
    Array.isArray(dati.most_famous_movies) && 
    dati.most_famous_movies.length === 3 &&
    "awards" in dati && 
    typeof dati.awards === "string" &&
    "nationality" in dati &&
    typeof dati.nationality === "string" && nazioni.includes(dati.nationality)
  ){
    return true
  }else{
    return false
  }

  
  
}


async function getActress(id:number): Promise<Actress | null>  {
  try{

    const response = await fetch(`http://localhost:3333/actresses/${id}`)
    const result =  await response.json() 

    if(isActress(result)){

      return result}

      return result

    }catch(error:unknown){
      if(typeof error === "string"){
        throw new Error(`errore nella chiamata ${error}`)
        
      }else{
      return null
    }
  
}}

/**📌 Milestone 4
Crea una funzione getAllActresses che chiama:

GET /actresses
La funzione deve restituire un array di oggetti Actress.

Può essere anche un array vuoto.
 */

async function getAllActresses(): Promise<Actress[] | null> {
  try{
  const response = await fetch(`http://localhost:3333/actresses`)
  const data: unknown = await response.json()
  if(Array.isArray(data) ){
    const filterActress = data.filter(d=> isActress(d))
    return filterActress
  }else{
    return null
  }
   
   
}catch(error:unknown){
      if(typeof error === "string"){
        throw new Error(`errore nella chiamata ${error}`)
        
      }else{
      return null
    }
  
}
}