BEGIN {
    print "Start"
    correctMatch = 0
    falsePositive = 0
    falseNegative = 0
    correctNonMatch = 0
}
{ 
    name = substr($1" "$2,1,length($1) + length($2))
    nationality = $NF
    if(name ~ /(b|ch|d|g|h|jj|j|kk|k|m|n|pp|p|r|ss|s|tch|tt|t)-?(ae|ah|a|eo|eu|e|i|oe|oo|o|ui|u|wae|wa|we|wi|wo|yae|ya|ye|yeo|yo|yu)(k|n|t|l|m|p|ng)-? (b|ch|d|g|h|jj|j|kk|k|m|n|pp|p|r|ss|s|tch|tt|t)-?(ae|ah|a|eo|eu|e|i|oe|oo|o|ui|u|wae|wa|we|wi|wo|yae|ya|ye|yeo|yo|yu)(k|n|t|l|m|p|ng)-?-?(b|ch|d|g|h|jj|j|kk|k|m|n|pp|p|r|ss|s|tch|tt|t)-?(ae|ah|a|eo|eu|e|i|oe|oo|o|ui|u|wae|wa|we|wi|wo|yae|ya|ye|yeo|yo|yu)(k|n|t|l|m|p|ng)-?/){
        if(nationality == "Korean"){
            correctMatch += 1
        }else{
            falsePositive += 1
        }
    }else{
        if(nationality == "Korean"){
            falseNegative += 1
        }else{
            correctNonMatch += 1
        }
    }
}
END {
    print("correctMatch: ",correctMatch)
    print("falsePositive: ",falsePositive)
    print("falseNegative: ",falseNegative)
    print("correctNonMatch: ",correctNonMatch)
    print "Done"
}
