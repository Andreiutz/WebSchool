function move1() {
    const select_1 = document.getElementById("select1");
    const select_2 = document.getElementById("select2");
    
    if(select_1.selectedIndex !== -1) {
      const selected_option = select_1.options[select_1.selectedIndex];
      
      let new_option = document.createElement('option');
      new_option.value = selected_option.value
      new_option.innerHTML = selected_option.innerHTML;
      select_2.appendChild(new_option);
      
      select_1.options.remove(select_1.selectedIndex)
    }
  
  }
  
  function move2(){
    const select_1 = document.getElementById("select1");
    const select_2 = document.getElementById("select2");
    
    if(select_2.selectedIndex !== -1) {
      const selected_option = select_2.options[select_2.selectedIndex];
      
      let new_option = document.createElement('option');
      new_option.value = selected_option.value
      new_option.innerHTML = selected_option.innerHTML;
      select_1.appendChild(new_option);

      select_2.options.remove(select_2.selectedIndex)

    }
    
  }