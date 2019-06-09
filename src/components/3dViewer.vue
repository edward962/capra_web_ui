<template>

</template>

<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { rosModule } from '@/store'

import * as THREE from 'three'

import { OrbitControls} from '@/utils/3dviewer/OrbitControls'
import { STLLoader } from '@/utils/3dviewer/STLLoader'


@Component
export default class d3Viewer extends Vue {
  @Prop({ default: '', required: true })
  readonly topic!: string


}
</script>


