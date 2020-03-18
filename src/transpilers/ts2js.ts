import { CompilerOptions, transpileModule } from 'typescript'
import debugFactory from 'debug'
import { SanSourceFile } from '../models/san-source-file'

const debug = debugFactory('san-ssr:ts2js')

export function tsSourceFile2js (sourceFile: SanSourceFile, compilerOptions: CompilerOptions) {
    debug('compile', sourceFile.getFilePath(), 'with options:', compilerOptions)
    return tsCode2js(sourceFile.getFullText(), compilerOptions)
}

export function tsCode2js (sourceCode: string, compilerOptions: CompilerOptions) {
    debug('source code:', sourceCode)
    const { outputText } = transpileModule(sourceCode, { compilerOptions })
    debug('target code:', outputText)
    return outputText
}
