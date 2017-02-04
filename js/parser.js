var transcript = [];
function parse(id) {
  var input = document.getElementById(id).value;

  var out = '';
  var terms = nlp_compromise.text(input).terms();
  console.log(terms);
  for (var i = 0; i<terms.length; i++) {
    out+= terms[i].normal + ",\t\t" + terms[i].tag;
    if (terms[i].expansion) {
      out+= " "+terms[i].expansion
    }
    if (terms[i].pos.Person) {
      out+= " is a person"
    }
    if (terms[i].pos.Place) {
      out+= " is a place"
    }
    out+= "\n";
  }
  out+="\n\n";
  var topics = nlp_compromise.text(input).topics();
  console.log(topics);
  for (var i = 0; i<topics.length; i++) {
    out+= topics[i].text + " ";
  }
  document.getElementById('userIn').value='';
  document.getElementById('put_stuff_here').innerText = out;
}
