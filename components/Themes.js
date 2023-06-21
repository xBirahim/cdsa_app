function GetRandomColor() {
  // Générer des valeurs de couleur aléatoires pour les composantes R, G et B
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Construire la chaîne CSS pour la couleur
  return `rgb(${red}, ${green}, ${blue})`;
}


export function GenerateRandomGradient() {
  // Générer des valeurs de couleur aléatoires pour le début et la fin du dégradé
  const colorStart = GetRandomColor();
  const colorEnd = GetRandomColor();

  // Construire la chaîne CSS pour le dégradé
  return `linear-gradient(to right, ${colorStart}, ${colorEnd})`;
}

export const Gradient = {
  neutral: "linear-gradient(90deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%);",
  antineutral: "linear-gradient(0deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%);",
  random:GenerateRandomGradient()
}

