<template >
  <div class="level6 full-size flex pa-4">

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="Produto" prop="produto">
        <el-input v-model="ruleForm.produto"></el-input>
      </el-form-item>
      <el-form-item label="Categoria" prop="categoria">
        <el-input type="categoria" v-model="ruleForm.categoria" autocomplete="off">
        </el-input>
      </el-form-item>
      <el-form-item label="Valor" prop="valor">
        <el-input type="valor" v-model.number="ruleForm.valor" autocomplete="off">
           <template slot="prepend">R$</template>
        </el-input>
      </el-form-item>
      <el-form-item label="Término" required>
        <el-col :span="11">
          <el-form-item prop="dataTermino">
            <el-date-picker type="date" placeholder="Escolha uma Data" v-model="ruleForm.dataTermino" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <!-- <el-form-item label="Raridade" prop="rarity">
        <el-radio-group v-model="ruleForm.rarity">
          <el-radio label="S"></el-radio>
          <el-radio label="A"></el-radio>
          <el-radio label="B"></el-radio>
          <el-radio label="C"></el-radio>
          <el-radio label="D"></el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="Descrição" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-upload
        class="avatar-uploader right-move"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-preview="handlePictureCardPreview"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form-item class="pt-3">
        <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        ruleForm: {
          produto: '',
          categoria: '',
          dataTermino: '',
          // rarity: '',
          desc: '',
          valor: '',
        },
        imageUrl: '',
        produto: '',
        rules: {
          produto: [
            { required: true, message: 'Por favor adicione o nome do produto', trigger: 'blur' },
            { min: 5, max: 100, message: 'O nome do produto tem que ter entre 5 e 100 caracteres', trigger: 'blur' },
          ],
          // region: [
          //   { required: true, message: 'Please select Activity zone', trigger: 'change' },
          // ],
          dataTermino: [
            { type: 'date', required: true, message: 'Por favor selecione uma data', trigger: 'change' },
          ],
          // rarity: [
          //   { required: true, message: 'Please select activity rarity', trigger: 'change' },
          // ],
          desc: [
            { required: true, message: 'Por favor adicione uma descrição', trigger: 'blur' },
          ],
          valor: [
            { required: true, message: 'Por favor adicione o valor do produto' },
            { type: 'number', message: 'O valor tem que ser um número' },
          ],
          categoria: [
            { required: true, message: 'Por favor adicione a categoria do produto' },
          ],
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$electron.ipcRenderer.send('/post/new-auction', {
              produto: this.ruleForm.produto,
              categoria: this.ruleForm.categoria,
              desc: this.ruleForm.desc,
              data: this.ruleForm.dataTermino.toISOString(),
              valor: this.ruleForm.valor,
              image: this.imageUrl,
            });
            this.$electron.ipcRenderer.once('/posted/new-auction', (event, response) => {
              console.log(response);
              alert('Leilão Adicionado!');
            });
          } else {
            console.log('error submit!!');
            return false;
          }
          return false;
        });
      },
      resetForm(formName) {
        this.imageUrl = '';
        this.$refs[formName].resetFields();
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('A foto do produto deve ser em formato JPG!');
        }
        if (!isLt2M) {
          this.$message.error('A foto do produto não pode exceder 2MB!');
        }
        return isJPG && isLt2M;
      },
    },
  };
</script>

<style lang="scss" scoped>

  


.flex {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  flex-direction: column;
}

.el-menu,
.el-menu-item {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.wrapper {
  max-width: 100%;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
}

.anime-image {
  border-radius: 5px;
  height: 250px;
  max-height: 250px;
  width: 172px;
  max-width: 172px;
  // position: relative;
  display: block;
}

.anime_icons {
  color: grey !important;
  // position: relative;
  margin-right: 2px;
  vertical-align: text-bottom;
}

.group {
  float: right;
}

.rating {
  float: left;
}

.text {
  color: grey;
  font-size: 13px;
}

.subinfo {
  margin-top: 3px;
  width: 100%;
  // text-align: center;
}

.card-size {
  width: 600px;
  max-width: 600px;
}

.anime_cards {
  // text-decoration: none;
  padding: 15px 25px 15px 25px;
  color: white;
  font-size: 14px;
  display: flex;
  flex-direction: column;
}

.truncate {
  width: 172px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-menu--horizontal {
  border: none;
}

.border2 {
  display: inline-block;
  position: relative;
  cursor: pointer;
}
.border2::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: inset 0 0 0 0 rgba(21, 101, 192, 1);
  border-radius: 5px;
  transition: box-shadow 0.1s ease;
}
.border2:hover::after {
  box-shadow: inset 0 0 0 4px rgba(64, 158, 255, 1);
  border-radius: 5px;
}

.border2:hover ~ .subinfo {
  & .text {
    color: white;
  }
  & .star {
    color: #ffa000 !important;
  }
  & .users {
    color: #5c6bc0 !important;
  }
}

.season-menu {
  min-height: 60px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.season-filter {
  min-height: 60px;
}

.season-menu-item {
  margin: auto;
  width: 140px;
  margin: 10px;
  float: left;
}

.season-treeselect {
  margin: auto;
  width: 100% -30px;
  margin: 10px;
}

.search {
  float: right;
  width: 200px;
}

.sort-icon {
  margin: auto;
  float: left;
  background-color: #16181c;
  margin: 11px 10px 10px 10px;
}
</style>

<style lang="scss">

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .right-move {
    margin-left: 120px;
  }

.el-input__inner {
  background-color: #16181c;
  border: 1px solid #282a2d;
  color: white;
  &:hover {
    border-color: #4f5053;
  }
  &:focus {
    border-color: #409eff;
  }
}

.el-input-group__append, .el-input-group__prepend {
  color: white;
  background-color: grey;
  border: 1px solid grey;
}

.el-select:hover .el-input__inner {
  border-color: #4f5053;
}
.expansion-panel__header {
  padding: 8px 21px;
}

.season-menu-item > .vue-treeselect__control {
    height: 40px;
  }

.vue-treeselect__single-value {
  line-height: 38px;
}
</style>
