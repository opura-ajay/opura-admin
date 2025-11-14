export function transformConfigSchema(apiResponse: any) {

  console.log('Transforming config schema:', apiResponse);
  const { sections, ...rest } = apiResponse;
  
  const transformed = {
    ...rest,
    sections: Object.entries(sections || {}).map(([key, section]) => ({
      id: key,
      ...(section as Record<string, any>),
    })),
  };
  
  console.log('Transformed config schema:', transformed);
  return transformed;
}
