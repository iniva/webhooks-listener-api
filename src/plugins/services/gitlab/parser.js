import fs from 'fs';

const parseTemplate = (template, data) => {
  // Replace string type values
  const replaced = template.replace(/{([\w]+)}/g, (str, key) => {
    let value = data[key] || str;

    if (typeof value === 'string') {
      value = value.replace(/"/g, '\\"');
    }

    return value;
  });

  // Convert to Object
  const parsed = JSON.parse(replaced);

  // Replace object type value
  Object.entries(parsed).forEach(([key, value]) => {
    if (/<([\w]+)>/g.test(value)) {
      parsed[key] = data[key];
    }
  });

  return parsed;
};

const parser = (eventName, data) => {
  try {
    const template = fs.readFileSync(`${__dirname}/templates/${eventName}.json`, { encoding: 'utf8' });
    const parsed = parseTemplate(template, data);

    return parsed;
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`There's no template for [${eventName}] event`);
    }

    throw new Error(`There was a problem while trying to parse event [${eventName}] template`);
  }
};

export default parser;
