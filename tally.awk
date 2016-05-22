BEGIN{
  RS="[ \t\n.,\\/:]+"
}{
  tally[tolower($0)]++
}END{
  for(word in tally){
    print word " " tally[i]
  }
}
