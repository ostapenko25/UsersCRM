<template>
  <div class="wrapper-content wrapper-content--fixed">   

      <!-- Pagination -->
      <section>
         <div class="container">  
           <div class="button-list">  
             <div class="btn btnPrimary" :class="{ 'unactive-prev': isPrevUnActive }"  @click="prevPage">Prev</div>
             <div> Page {{ this.page.current }} </div> 
             <div class="btn btnPrimary" :class="{ 'unactive-next': isNextUnActive }"  @click="nextPage">Next</div>
           </div> 
         </div>
      </section> 

       <!-- Data Table -->
      <section>
         <div class="container">      
            <table>
              <thead>
                 <tr>
                    <th @click="sort('name')">Name</th>
                    <th @click="sort('age')">Age</th>
                    <th @click="sort('gender')">Gender</th>                     
                 </tr>
              </thead>
              <tbody>
                <tr v-for="user in usersSort" :key="user.id">
                    <td>
                      <img :src="user.img" :alt="user.name">
                        <span> {{ user.name }} </span>
                      </td>
                    <td> {{ user.age }} </td>
                    <td> {{ user.gender }} </td>
                </tr>
              </tbody>
            </table> 
         </div>
      </section>
    </div>
</template>

<script >
import axios from 'axios'

export default {
  data () {
    return {
       users: [],
       currentSort: 'name',
       currentSortDir: 'asc',
       page: {
          current: 1,
          length: 4,
       },
      isPrevUnActive: true,
      isNextUnActive: false
    }
  },   
  created () {
    axios
      .get('https://tocode.ru/static/_secret/courses/1/usersCrmApi.php')
      .then(response => {         
          this.users = response.data 
        })
      .catch(error => {         
          console.log(error) 
        })   
  },
  computed: {
    usersSort() {
      return [...this.users]
        .sort((a, b) => {
          let mod = 1
          if (this.currentSortDir === "desc") mod = -1
          if (a[this.currentSort] < b[this.currentSort]) return -1 * mod
          if (a[this.currentSort] > b[this.currentSort]) return 1 * mod
          return 0
        }) 
        .filter((row, index) => {
          let start = (this.page.current - 1) * this.page.length;
          let end = this.page.current * this.page.length;
          if (index >= start && index < end) return true;
        });       
    }    
  },
  methods: {
    //Sorting
    sort(e) {
      if (e === this.currentSort) {
         this.currentSortDir = this.currentSortDir === "asc" ? 'desc' : "asc"
      }
      this.currentSort = e
    },
     // Pagination
    prevPage() {
      if (this.page.current > 1){
        this.page.current -= 1
        this.isNextUnActive = false                   
      } else {      
        this.isPrevUnActive = true               
      }              
    },
    nextPage() {
      if (this.page.current * this.page.length < this.users.length) {
        this.page.current += 1; 
        this.isPrevUnActive = false       
      } else {        
        this.isNextUnActive = true;       
      }
    },
  }  
}
</script>

<style lang="scss" scoped>
  img {
    width: 50px;
    height: auto;
    border-radius: 50%;
    margin-right: 10px
  }
  .button-list {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;

    .unactive-prev,
    .unactive-next {
      opacity: 0.3      
    }
  }
   .btn {
      margin: 0 20px
    }
   
</style>