import { html } from 'js-beautify'

export const beautifyHTML = (code: string): string => {
return html(code, {
  indent_size: 2,
  indent_char: ' ',
  max_preserve_newlines: 0,
  preserve_newlines: false,
  indent_scripts: 'normal',
  end_with_newline: false,
  wrap_line_length: 0,
  indent_inner_html: false,
  indent_empty_lines: false,
})
}
