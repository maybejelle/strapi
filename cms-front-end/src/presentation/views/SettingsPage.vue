<template>
    <div>
        <h1>My Families</h1>
        <button class="back" @click="returnToHomePage">Go Back</button>
        <div v-for="family in families" :key="family.documentId" class="wrapper">
            <div>
                <h2>{{ family.name }}</h2>
                <button @click="getFamilyData(family.documentId)">
                    {{ expandedFamily === family.documentId ? "Hide Family" : "View Family" }}
                </button>
            </div>
            <transition name="fade">
                <div v-if="expandedFamily === family.documentId" class="details">
                    <p v-if="familyDetails[family.documentId]">
                        Family Name: {{ familyDetails[family.documentId].familyName }}
                    </p>
                    <p v-if="familyDetails[family.documentId]">
                        Owner: {{ familyDetails[family.documentId].owner}}
                    </p>
                    <p v-if="familyDetails[family.documentId]">
                        Members: {{ familyDetails[family.documentId].members.join(", ") }}
                    </p>
                    <p v-else>Loading family data...</p>
                </div>
            </transition>
        </div>
    </div>
</template>


<script>
import { getFamilyData, getPersonalData } from '../../infrastructure/APICalls';
export default {
    data() {
        return {
            name: '',
            email: '',
            families: [],
            expandedFamily: null,
            familyDetails: {}
        }
    },
    created() {
        getPersonalData(this.$cookies.get('jwt'))
            .then(response => {
                this.name = response.data.username
                this.email = response.data.email
                this.families = response.data.families
            })
            .catch(error => {
                console.log(error);
            });
    },
    methods: {
        returnToHomePage() {
            this.$router.push({ path: '/homePage' });
        },
        getFamilyData(familyId) {
            if (this.familyDetails[familyId]) {
                this.expandedFamily = null
                this.familyDetails[familyId] = null
                return
            }
            getFamilyData(this.$cookies.get('jwt'), familyId)
                .then(response => {
                    this.expandedFamily = familyId
                    this.familyDetails[familyId] = response

                })
                .catch(error => {
                    console.log(error);
                });

        },
    }
}
</script>


<style scoped>
.profile {
    display: flex;
    border: 1px solid black;
    border-radius: 1rem;
    text-align: left;
    padding: 0 1rem;
    width: 30%;
}

.profile button {
    margin-left: auto;
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.back {
    position: absolute;
    margin: 1rem;
    background-color: transparent;
    border: 1px solid black;
    border-radius: 1rem;
    cursor: pointer;
    top: 2rem;
    right: 2rem;
}

.wrapper>div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;
    height: 2rem;
    margin: 2rem;
}

button{
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}


.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>