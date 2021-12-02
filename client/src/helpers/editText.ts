export function editText(
  label: string,
  searchText: string
): [firstPart: string, several: string, secondPart: string] {
  const splitedSport = label
    .toLowerCase()
    .split(searchText.toLowerCase().trim());

  const firstPart =
    splitedSport[0].charAt(0).toUpperCase() + splitedSport[0].slice(1);

  const secondPart = splitedSport[1];
  let several = searchText.toLowerCase();

  if (firstPart.length === 0) {
    several = several.charAt(0).toUpperCase() + several.slice(1);
  }

  return [firstPart, several, secondPart];
}
