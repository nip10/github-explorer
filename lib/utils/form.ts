// https://github.com/react-hook-form/react-hook-form/discussions/1991#discussioncomment-4593488
type UnknownObject = Record<string, unknown>;
type UnknownArrayOrObject = unknown[] | UnknownObject;

const getDirtyFields = (
  dirtyFields: UnknownArrayOrObject | boolean | unknown,
  allValues: UnknownArrayOrObject | unknown
): UnknownArrayOrObject | unknown => {
  if (dirtyFields === true || Array.isArray(dirtyFields)) {
    return allValues;
  }

  const dirtyFieldsObject = dirtyFields as UnknownObject;
  const allValuesObject = allValues as UnknownObject;

  return Object.fromEntries(
    Object.keys(dirtyFieldsObject).map((key) => [
      key,
      getDirtyFields(dirtyFieldsObject[key], allValuesObject[key]),
    ])
  );
};

export { getDirtyFields };
