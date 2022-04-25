import { FunFact } from './types';

export default async function funfact(): Promise<FunFact> {
  const apiResponse = await fetch('https://api.chucknorris.io/jokes/random?category=dev');

  const funFact = await apiResponse.json();
  return(
    {
      fact: funFact.value
    }
  )
}