'use strict';
module.exports = ArticlesDetails;
/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */
/**
 * Creates new instance of the "articles-details" component.
 * @constructor
 */
function ArticlesDetails() {
}
/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
// ArticlesDetails.prototype.render = function () {
//
// };
/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
// ArticlesDetails.prototype.bind = function () {
//
// };
/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
// ArticlesDetails.prototype.unbind = function () {
//
// };
/**
 * Set the entire details object for the commit.
 * @param {Object} details Commit details.
 * @param {Number} details.stats.additions Count of additions.
 * @param {Number} details.stats.deletions Count of deletions.
 * @param {Number} details.stats.total Count of total changes.
 * @param {Number} details.stats.commit.comment_count Count of comments.
 * @param {Number} details.html_url Link to commit page.
 */
ArticlesDetails.prototype.setDetails = function (details) {
  // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
  this.setAdditions(details.stats.additions);
  this.setDeletions(details.stats.deletions);
  this.setTotal(details.stats.total);
  this.setCommentCount(details.commit.comment_count);
  this.setCommentLink(details.html_url);
};
/**
 * Set total addition count.
 * @param {Number} count Count of addition changes.
 */
ArticlesDetails.prototype.setAdditions = function (count) {
  this.$context.element.getElementsByClassName('additions')[0].innerHTML = count;
};
/**
 * Set total deletion count.
 * @param {Number} count Count of deletion changes.
 */
ArticlesDetails.prototype.setDeletions = function (count) {
  this.$context.element.getElementsByClassName('deletions')[0].innerHTML = count;
};
/**
 * Set total change count of the commit.
 * @param {Number} count Count of total changes.
 */
ArticlesDetails.prototype.setTotal = function (count) {
  this.$context.element.getElementsByClassName('total')[0].innerHTML = count;
};
/**
 * Sets comment count of the commit.
 * @param {Number} count Comment count.
 */
ArticlesDetails.prototype.setCommentCount = function (count) {
  this.$context.element.getElementsByClassName('comment-count')[0].innerHTML = count;
};
/**
 * Sets link to the comments page of the commit.
 * @param {String} link URL to comments page.
 */
ArticlesDetails.prototype.setCommentLink = function (link) {
  this.$context.element.getElementsByClassName('comments-link')[0].setAttribute('href', link);
};