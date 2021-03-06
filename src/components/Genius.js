// import cheerio from 'cheerio';

// class Genius {
//   async annotations(id, count) {
//     const url = `https://genius.com/songs/${id}/embed.js`;
//     const response = await fetch(url);
//     const text = await response.text();
//     console.log('text', text);
//     const parsed = cheerio.load(
//       eval(text.slice(text.indexOf('JSON.parse('), text.lastIndexOf('))') + 1))
//     );
//     const children = parsed('.rg_embed_body > p').contents();
//     const components = [];
//     const referents = await this.referents(id, count);
//     const annotationMap = new Map();
//     referents.forEach((r) => {
//       annotationMap.set(
//         r.api_path.substr(r.api_path.lastIndexOf('/') + 1),
//         r.annotations[0].body.html
//       );
//     });
//     let currentLine = { lyrics: '', annotation: null };
//     const addLine = () => {
//       if (currentLine.lyrics.trim().length !== 0) {
//         components.push(currentLine);
//       }
//       currentLine = { lyrics: '', annotation: null };
//     };
//     children.each((c) => {
//       const line = children[c];
//       if (line.name === 'br') {
//         addLine();
//       } else if (line.type === 'text') {
//         currentLine.lyrics += line.data;
//       } else if (
//         line.name === 'i' &&
//         line.children.length > 0 &&
//         line.children[0].type === 'text'
//       ) {
//         currentLine.lyrics += line.children[0].data;
//       } else {
//         addLine();
//         const $ = cheerio.load(line);
//         const link = $('a');
//         if (link.html()) {
//           components.push({
//             lyrics: link.removeAttr('href target onclick').html(),
//             annotation: annotationMap.get(link.attr('data-id')),
//           });
//         }
//       }
//     });
//     addLine();
//     return components;
//   }
// }

// export default Genius;
