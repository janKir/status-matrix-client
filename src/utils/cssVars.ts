type AnyCssProperties = {
  [prop in any]: any;
};

export function cssVars(props: AnyCssProperties): AnyCssProperties {
  return Object.fromEntries(
    Object.entries(props).map(([key, value]) => [`--${key}`, value])
  );
}
